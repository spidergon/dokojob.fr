import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';
import { logoText } from '@utils/tools';

dayjs.extend(relativeTime);
dayjs.locale(fr);

const LOCATIONS = {
  971: 'Guadeloupe',
  972: 'Martinique',
  973: 'Guyane',
  974: 'Réunion',
  976: 'Mayotte',
};

const convertContractCode = (code) => {
  switch (code) {
    case 'MIS':
      return 'Intérim';
    case 'SAI':
      return 'Saisonnier';
    case 'CDS': // CDD Sénior
      return 'CDD';
    default:
      return code;
  }
};

const formatDate = (d) =>
  dayjs(d)
    .fromNow(true)
    .replace(/une?/, '1')
    .replace(/secondes?/, 's')
    .replace(/minutes?/, 'm')
    .replace(/heures?/, 'h')
    .replace(/jours?/, 'j')
    .replace('mois', 'mo')
    .replace('quelques secondes', '1 m');

async function getAuthToken(scope) {
  const authUrl =
    'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire';
  const urlencoded = new URLSearchParams();

  urlencoded.append('grant_type', 'client_credentials');
  urlencoded.append('client_id', process.env.ES_CLIENT_ID);
  urlencoded.append('client_secret', process.env.ES_CLIENT_SECRET);
  urlencoded.append('scope', scope);

  const response = await fetch(authUrl, {
    method: 'POST',
    body: urlencoded,
  });

  if (!response.ok) throw response;

  const { access_token, token_type } = await response.json();

  return `${token_type} ${access_token}`;
}

async function get(appId, token, params) {
  const url = new URL(`https://api.emploi-store.fr/partenaire/${appId}`);

  url.search = new URLSearchParams(params);

  const response = await fetch(url, {
    headers: { Authorization: token },
  });

  if (!response.ok) throw response;

  const { resultats } = await response.json();

  return resultats;
}

async function fetchJobs() {
  console.log('ES - Job Auth Token...');

  const token = await getAuthToken(
    `api_offresdemploiv2 application_${process.env.ES_CLIENT_ID} o2dsoffre`
  );

  console.log('ES - Getting Jobs...');

  const data = await get('offresdemploi/v2/offres/search', token, {
    departement: '971,972,973,974,976',
    grandDomaine: 'M18', // Informatique / Télécommunication
    publieeDepuis: 31, // Jours
    sort: 1,
  });

  const jobs = [];

  data.forEach((job) => {
    if (!job.description) return; // Job description is required

    const {
      id,
      intitule,
      dateCreation,
      description,
      entreprise,
      lieuTravail,
      origineOffre,
      salaire,
      typeContrat,
      // typeContratLibelle,
    } = job;

    const newJob = {
      id,
      companyName: entreprise?.nom ? entreprise.nom : 'Pôle Emploi',
      title: intitule,
      location: lieuTravail?.libelle ? LOCATIONS[lieuTravail.libelle.slice(0, 3)] : '',
      contract: convertContractCode(typeContrat),
      // contractLabel: typeContratLibelle,
      logo: entreprise?.logo ? entreprise.logo : '',
      salary: salaire?.libelle ? salaire.libelle : '',
      description,
      source: origineOffre?.urlOrigine ? origineOffre.urlOrigine : '',
      companyUrl: entreprise?.url ? entreprise.url : '',
      createdAt: formatDate(dateCreation),
      slug: slugify(intitule + '-' + id, { lower: true }).replace(/-\(?hf\)?/, ''),
    };

    // const newJob = {
    //   id,
    //   title: intitule,
    //   slug: slugify(intitule + '-' + id, {
    //     lower: true,
    //   }).replace(/-\(?hf\)?/, ''),
    //   description,
    //   location: { label: lieuTravail && lieuTravail.libelle ? lieuTravail.libelle : '' },
    //   source: origineOffre && origineOffre.urlOrigine ? origineOffre.urlOrigine : '',
    //   salary: salaire && salaire.libelle ? salaire.libelle : '',
    //   contract: { code: convertContractCode(typeContrat), label: typeContratLibelle },
    //   company: {
    //     name: entreprise && entreprise.nom ? entreprise.nom : 'Pôle Emploi',
    //     logo: entreprise && entreprise.logo ? entreprise.logo : '',
    //     url: entreprise && entreprise.url ? entreprise.url : '',
    //   },
    //   createdAt: formatDate(dateCreation),
    //   raw_createdAt: dateCreation,
    // };

    if (newJob.companyName === 'Pôle Emploi' && !newJob.logo) {
      newJob.logo =
        'https://res.cloudinary.com/cserviusprod/image/upload/v1581454070/jobapp/pole-emploi-logo.png';
    }

    if (!newJob.logo) {
      newJob.logoText = logoText(newJob.companyName);
    }
    // if (newJob.company.name === 'Pôle Emploi' && !newJob.company.logo) {
    //   newJob.company.logo =
    //     'https://res.cloudinary.com/cserviusprod/image/upload/v1581454070/jobapp/pole-emploi-logo.png';
    // }

    // if (!newJob.company.logo) {
    //   newJob.company.logoText = logoText(newJob.company.name);
    // }

    // if (newJob.location.label) newJob.location.label = LOCATIONS[newJob.location.label.slice(0, 3)];

    jobs.push(newJob);
  });

  return jobs;
}

// async function fetchGoodBoys() {
//   console.log('ES - Goodboy Auth Token...');

//   const token = await getAuthToken(`api_labonneboitev1 application_${process.env.ES_CLIENT_ID}`);

//   console.log('ES - Getting Good Boys...');

//   const data = await get('labonneboite/v1/company', token, {
//     // departments: '971,972,973,974,976',
//     // departments: '93,92,91',
//     // rome_codes: 'M1801,M1806,M1803,M1805,M1802,I1401',
//     rome_codes: 'M1607',
//   });

//   return data;
// }

async function processJobs() {
  try {
    return fetchJobs();
  } catch (error) {
    console.error(error);

    return [];
  }
}

export async function getJobs() {
  let jobs;

  if (process.env.NODE_ENV === 'production') {
    console.log('ES - Processing job data...');

    jobs = await processJobs();
  } else {
    console.log('ES - Processing sample job data...');

    try {
      jobs = require('./sampleJobs.json');
    } catch (error) {
      console.log('ES - No sample data found');

      jobs = await processJobs();

      const fs = require('fs');

      fs.writeFile('./src/utils/sampleJobs.json', JSON.stringify(jobs), 'utf8', (err) => {
        if (err) console.error('Error writing sample data:', err);
      });
    }
  }

  console.log('ES - Done.');

  return jobs;
}

export function getAllJobIds() {
  console.log('ALL');
  const ids = ['test'];

  return ids.map((id) => {
    return {
      params: {
        id,
      },
    };
  });
}

export function getJobData(id) {
  return {
    id,
    name: id,
  };
}
