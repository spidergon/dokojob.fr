import { verify } from 'jsonwebtoken';
import { secuEnv } from '@utils/api/env';
import { manageError } from '@utils/api/tools';
import { updateJob } from '@utils/api/base';

export default async function checkTokenApi(req, res) {
  if (!req.query.token) {
    return manageError({
      res,
      message: 'Invalid request',
      error: { method: req.method, body: req.body },
    });
  }

  try {
    const { id, email } = verify(req.query.token, secuEnv.secret);

    await updateJob(id, { valid: true });

    res.status(200).json({ id, email });
  } catch (error) {
    manageError({ res, message: 'Invalid request', error });
  }
}
