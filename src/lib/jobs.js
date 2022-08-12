import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';
import { logoText } from '@lib/tools';
import { getJobs as getOwnJobs } from '@lib/api/base';

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
    .replace(/quelques s.*/, '1 m');

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
  const jobs = [];

  console.log('Getting Custom Jobs...');
  const customJobs = await getOwnJobs();

  customJobs.forEach((job) => {
    jobs.push({
      id: job.id,
      companyName: job.companyName,
      title: job.title,
      location: job.location,
      contract: job.contract,
      logo: job.logo || '',
      logoText: logoText(job.companyName),
      salary: job.salary || '',
      description: job.description,
      source: job.source,
      companyUrl: job.companyUrl || '',
      color: job.color || '',
      createdAt: formatDate(job.created),
      date: dayjs(job.created).valueOf(),
      slug: slugify(job.title + '-' + job.id, { lower: true }).replace(/-\(?hf\)?/, ''),
    });
  });

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
    } = job;

    const newJob = {
      id,
      companyName: entreprise?.nom ? entreprise.nom : 'Pôle Emploi',
      title: intitule,
      location: lieuTravail?.libelle ? LOCATIONS[lieuTravail.libelle.slice(0, 3)] : '',
      contract: convertContractCode(typeContrat),
      logo: entreprise?.logo ? entreprise.logo : '',
      salary: salaire?.libelle ? salaire.libelle : '',
      description,
      source: origineOffre?.urlOrigine ? origineOffre.urlOrigine : '',
      companyUrl: entreprise?.url ? entreprise.url : '',
      createdAt: formatDate(dateCreation),
      date: dayjs(dateCreation).valueOf(),
      slug: slugify(intitule + '-' + id, { lower: true }).replace(/-\(?hf\)?/, ''),
    };

    if (newJob.companyName === 'Pôle Emploi' && !newJob.logo) {
      newJob.logo =
        'https://res.cloudinary.com/cservius/image/upload/v1581454070/jobapp/pole-emploi-logo.png';
    }

    if (!newJob.logo) {
      newJob.logoText = logoText(newJob.companyName);
    }

    jobs.push(newJob);
  });

  return jobs.sort((a, b) => b.date - a.date);
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
    console.log('Processing job data...');

    jobs = await processJobs();
  } else {
    console.log('Processing sample job data...');

    const fs = require('fs');
    const path = './src/lib/sampleJobs.json';

    try {
      if (fs.existsSync(path)) {
        const jsonFile = fs.readFileSync(path);

        jobs = JSON.parse(jsonFile);
      } else {
        console.log('No sample data found');

        jobs = await processJobs();

        const fs = require('fs');

        fs.writeFile(path, JSON.stringify(jobs), 'utf8', (err) => {
          if (err) console.error('Error writing sample data:', err);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  console.log('Done.');

  return jobs;
}

// export function getAllJobIds() {
//   console.log('ALL');
//   const ids = ['test'];

//   return ids.map((id) => {
//     return {
//       params: {
//         id,
//       },
//     };
//   });
// }

// export function getJobData(id) {
//   return {
//     id,
//     name: id,
//   };
// }
