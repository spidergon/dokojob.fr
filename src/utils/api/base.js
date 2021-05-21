import Airtable from 'airtable';
import { airtableEnv } from './env';

const base = new Airtable({ apiKey: airtableEnv.apiKey }).base(airtableEnv.baseId);

const jobsTable = 'Jobs';
const usersTable = 'Users';

/**
 * Create a job.
 * @param {object} fields The fields to be created.
 */
export function createJob(fields) {
  return base(jobsTable).create([{ fields }]);
}

/**
 * Select all jobs.
 * @param {array} sort The array of objects (ex: [{ field: 'created' }]).
 */
export function selectAllJobs(sort) {
  return base(jobsTable).select({ sort, view: 'Grid view' }).firstPage();
}

/**
 * Create a user.
 * @param {object} fields The fields to be created.
 */
export function createUser(fields) {
  return base(usersTable).create([{ fields }]);
}

/**
 * Update a user.
 * @param {string} id The id of the user.
 * @param {object} fields The fields to be updated.
 */
export function updateUser(id, fields) {
  return base(usersTable).update([{ id, fields }]);
}

/**
 * Select users.
 * @param {array} fields The fields to be selected (ex: ['authLinkToken', 'authLinkExpires']).
 * @param {string} filterByFormula The formula by which to select the users.
 */
export function selectUsers(fields, filterByFormula) {
  return base(usersTable).select({ fields, filterByFormula, view: 'Grid view' }).firstPage();
}
