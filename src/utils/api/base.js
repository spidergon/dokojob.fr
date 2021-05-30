import Airtable from 'airtable';
import { airtableEnv } from './env';

const base = new Airtable({ apiKey: airtableEnv.apiKey }).base(airtableEnv.baseId);

const JOBS_TABLE = 'Jobs';

/**
 * Get all the valid and published jobs.
 * @returns The jobs array.
 */
export async function getJobs() {
  const jobs = await base(JOBS_TABLE)
    .select({
      filterByFormula: 'AND({valid}=TRUE(),{status}="published")',
      sort: [{ field: 'created' }],
      view: 'Grid view',
    })
    .firstPage();

  return jobs.map((record) => ({ id: record.id, ...record.fields }));
}

/**
 * Get a job.
 * @param {string} id The id of the job.
 * @returns The job object.
 */
export async function getJob(id) {
  const job = await base(JOBS_TABLE).find(id);

  return { id: job.id, ...job.fields };
}

/**
 * Create a job.
 * @param {object} fields The fields to be created.
 * @returns The job id.
 */
export async function createJob(fields) {
  const [job] = await base(JOBS_TABLE).create([{ fields }]);

  return job.id;
}

/**
 * Update a job.
 * @param {string} id The id of the job.
 * @param {object} fields The fields to be updated.
 * @returns The job id.
 */
export async function updateJob(id, fields) {
  const job = await base(JOBS_TABLE).update([{ id, fields }]);

  return job.id;
}
