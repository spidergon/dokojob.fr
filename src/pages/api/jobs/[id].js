import { getJob, updateJob } from '@lib/api/base';
import redis from '@lib/api/redis';
import { manageError } from '@lib/api/tools';

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET' || !req.query.id) {
      return manageError({
        res,
        message: 'Invalid request',
        error: { method: req.method, body: req.body, message: 'Bad method or Id is missing' },
      });
    }

    let jobs = await redis.getJobs();

    jobs = JSON.parse(jobs).jobs;

    const job = jobs.find((j) => j.slug === req.query.id);

    if (!job) {
      return manageError({
        res,
        status: 404,
        message: 'Not found',
      });
    }

    res.status(200).json(job || { job: {} });

    // if (req.method === 'GET') {
    //   const job = await getJob(req.query.id);

    //   res.status(200).json(job);
    // } else if (req.method === 'PATCH') {
    //   const id = await updateJob(req.query.id, req.body);

    //   res.status(200).json({ id });
    // } else {
    //   manageError({
    //     res,
    //     message: 'Invalid request',
    //     error: { method: req.method, body: req.body },
    //   });
    // }
  } catch (error) {
    // if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    //   return manageError({ res, message: 'Invalid request', error });
    // }
    manageError({ res, status: 500, message: 'Internal error', error });
  }
}
