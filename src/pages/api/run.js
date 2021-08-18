import { manageError } from '@lib/api/tools';
import { secuEnv } from '@lib/api/env';
import { getJobs } from '@lib/jobs';
import redis from '@lib/api/redis';

export default async function handler(req, res) {
  if (!req?.headers?.authorization) {
    return manageError({ res, status: 401, message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return manageError({
      res,
      message: 'Invalid request',
      error: { method: req.method, body: req.body },
    });
  }

  try {
    const auth = req.headers.authorization.split(' ')[1];

    if (auth !== secuEnv.runSecret) {
      return manageError({ res, status: 401, message: 'Unauthorized' });
    }

    const jobs = await getJobs();

    await redis.set('jobs', JSON.stringify(jobs));

    res.status(200).json({ success: 'true' });
  } catch (error) {
    manageError({ res, status: 500, message: 'Internal error', error });
  }
}
