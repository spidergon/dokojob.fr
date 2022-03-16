export const locations = ['Guadeloupe', 'Guyane', 'Martinique', 'Mayotte', 'Réunion'];

export const contracts = [
  'CDI',
  'CDD',
  'Intérim',
  'Télétravail',
  'Alternance',
  'Saisonnier',
  'Stage',
];

export const codeToLabel = {
  CDI: 'Contrat à durée indéterminée',
  CDD: 'Contrat à durée déterminée',
  Intérim: 'Mission intérimaire',
  Télétravail: 'Télétravail',
  Alternance: 'Alternance',
  Saisonnier: 'Contrat travail saisonnier',
  Stage: 'Stage',
};

export const PRICE1 = 20;
export const PRICE2 = 45;
export const PRICE3 = 75;
export const PRICE4 = 90;

// export const urlPattern =
//   /https\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/=]*)/;

export const emailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
