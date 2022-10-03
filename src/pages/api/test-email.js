import { manageError } from '@lib/api/tools';
import { secuEnv } from '@lib/api/env';
import { emailPattern } from '@lib/constants';
import sendEmail from '@lib/api/email';

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

  if (!req?.body?.email || (req.body.email && !emailPattern.test(req.body.email))) {
    return manageError({
      res,
      message: 'Invalid request',
      error: `"email" is missing or incorrect`,
    });
  }

  try {
    const auth = req.headers.authorization.split(' ')[1];

    if (auth !== secuEnv.runSecret) {
      return manageError({ res, status: 401, message: 'Unauthorized' });
    }

    await sendEmail({
      to: req.body.email,
      subject: "Test d'envoi d'e-mail",
      html: '<p>Bonjour,</p><p>Ceci est un test.</p>',
    });

    res.status(200).json({ success: 'true' });
  } catch (error) {
    manageError({ res, status: 500, message: 'Internal error', error });
  }
}
