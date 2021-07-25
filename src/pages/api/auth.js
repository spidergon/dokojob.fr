import { verify } from 'jsonwebtoken';
import { secuEnv } from '@utils/api/env';
import { manageError } from '@utils/api/tools';

export default async function authApi(req, res) {
  if (!req.query.token) {
    return manageError({
      res,
      message: 'Invalid request',
      error: { method: req.method, body: req.body },
    });
  }

  try {
    const payload = verify(req.query.token, secuEnv.secret);

    res.status(200).json({ payload });
  } catch (error) {
    manageError({ res, message: 'Invalid request', error });
  }
}
