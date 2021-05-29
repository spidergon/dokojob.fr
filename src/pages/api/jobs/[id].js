import { getJob, updateJob } from '@utils/api/base';
import { manageError } from '@utils/api/tools';

export default async (req, res) => {
  try {
    if (!req.query.id) {
      return manageError({
        res,
        message: 'Invalid request',
        error: { method: req.method, body: req.body, message: 'Id is missing' },
      });
    }

    if (req.method === 'GET') {
      const job = await getJob(req.query.id);

      res.status(200).json({ id: job.id, ...job.fields });
    } else if (req.method === 'PATCH') {
      const { id } = await updateJob(req.query.id, req.body);

      res.status(200).json({ id });
    } else {
      manageError({
        res,
        message: 'Invalid request',
        error: { method: req.method, body: req.body },
      });
    }
  } catch (error) {
    if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
      return manageError({ res, message: 'Invalid request', error });
    }
    manageError({ res, status: 500, message: 'Internal error', error });
  }
};
