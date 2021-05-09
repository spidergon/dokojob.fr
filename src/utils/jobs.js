import dayjs from 'dayjs';
import fr from 'dayjs/locale/fr';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';

dayjs.extend(relativeTime);
dayjs.locale(fr);

const locations = {
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

const logoText = (txt) => {
  const [first, second, third] = txt.split(' ').slice(0, 3);
  let result = '';

  if (first && first.length > 2) result += first[0];
  if (second && second.length > 2) result += second[0];
  else if (third && third.length > 2) result += third[0];

  return result;
};

async function getAuthToken() {
  console.log('ES - Auth Token...');

  const authUrl =
    'https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=%2Fpartenaire';
  const urlencoded = new URLSearchParams();

  urlencoded.append('grant_type', 'client_credentials');
  urlencoded.append('client_id', process.env.ES_CLIENT_ID);
  urlencoded.append('client_secret', process.env.ES_CLIENT_SECRET);
  urlencoded.append(
    'scope',
    `api_offresdemploiv2 application_${process.env.ES_CLIENT_ID} o2dsoffre`
  );

  const response = await fetch(authUrl, {
    method: 'POST',
    body: urlencoded,
  });

  if (!response.ok) throw response;

  const { access_token, token_type } = await response.json();

  return `${token_type} ${access_token}`;
}

async function fetchJobs(token) {
  console.log('ES - Getting Jobs...');

  const url = 'https://api.emploi-store.fr/partenaire/offresdemploi/v2/offres/search';

  const newUrl = new URL(url);

  newUrl.search = new URLSearchParams({
    departement: '971,972,973,974,976',
    grandDomaine: 'M18', // Informatique / Télécommunication
    publieeDepuis: '31', // Jours
  });

  const response = await fetch(newUrl, {
    headers: { Authorization: token },
  });

  if (!response.ok) throw response;

  const { resultats } = await response.json();

  const result = [];

  resultats.forEach((job) => {
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
      typeContratLibelle,
    } = job;

    const newJob = {
      id,
      title: intitule,
      slug: slugify(intitule + '-' + id, {
        lower: true,
        strict: true,
      }).replace(/-\(?hf\)?/, ''),
      description,
      location: { label: lieuTravail && lieuTravail.libelle ? lieuTravail.libelle : '' },
      source: origineOffre && origineOffre.urlOrigine ? origineOffre.urlOrigine : '',
      salary: salaire && salaire.libelle ? salaire.libelle : '',
      contract: { code: convertContractCode(typeContrat), label: typeContratLibelle },
      company: {
        name: entreprise && entreprise.nom ? entreprise.nom : 'Pôle Emploi',
        logo: entreprise && entreprise.logo ? entreprise.logo : '',
        url: entreprise && entreprise.url ? entreprise.url : '',
      },
      createdAt: formatDate(dateCreation),
      raw_createdAt: dateCreation,
    };

    if (newJob.company.name === 'Pôle Emploi' && !newJob.company.logo) {
      newJob.company.logo =
        'https://res.cloudinary.com/cserviusprod/image/upload/v1581454070/jobapp/pole-emploi-logo.png';
    }

    if (!newJob.company.logo) {
      newJob.company.logoText = logoText(newJob.company.name);
    }

    if (newJob.location.label) newJob.location.label = locations[newJob.location.label.slice(0, 3)];

    result.push(newJob);
  });

  return result;
}

async function processJobs() {
  try {
    const token = await getAuthToken();

    return fetchJobs(token);
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
  const ids = ['toto', 'titi'];

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
