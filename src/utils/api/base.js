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
 * Create a user.
 * @param {object} fields The fields to be created.
 * @param {function} callback The callback function to run (parameters: err, records).
 */
export function createUser(fields, callback) {
  base(usersTable).create([{ fields }], callback);
}

/**
 * Update a user.
 * @param {string} id The id of the user.
 * @param {object} fields The fields to be updated.
 * @param {function} callback The callback function to run (parameters: err, records).
 */
export function updateUser(id, fields, callback) {
  base(usersTable).update([{ id, fields }], callback);
}

/**
 * Select all jobs.
 * @param {array} sort The array of objects (ex: [{ field: 'created' }]).
 * @param {function} callback The callback function to run (parameters: err, records).
 */
export function selectAllJobs(sort, callback) {
  base(jobsTable).select({ sort, view: 'Grid view' }).firstPage(callback);
}

/**
 * Select users.
 * @param {array} fields The fields to be selected (ex: ['authLinkToken', 'authLinkExpires']).
 * @param {string} filterByFormula The formula by which to select the users.
 * @param {function} callback The callback function to run (parameters: err, records).
 */
export function selectUsers(fields, filterByFormula, callback) {
  base(usersTable).select({ fields, filterByFormula, view: 'Grid view' }).firstPage(callback);
}
