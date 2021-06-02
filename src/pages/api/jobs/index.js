import { sign } from 'jsonwebtoken';
import { emailPattern, PRICE1, PRICE2, PRICE3, PRICE4 } from '@utils/constant';
import { createJob, getJobs } from '@utils/api/base';
import { secuEnv } from '@utils/api/env';
import { manageError } from '@utils/api/tools';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const jobs = await getJobs();

      res.status(200).json({ jobs });
    } catch (error) {
      manageError({ res, status: 500, message: 'Internal error', error });
    }
  } else if (req.method === 'POST') {
    const { body } = req;

    const requiredFields = [
      'companyName',
      'title',
      'location',
      'contract',
      'description',
      'companyEmail',
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return manageError({ res, message: 'Invalid request', error: `Field "${field}" required` });
      }
    }

    if (!body.source && !body.sourceEmail) {
      return manageError({
        res,
        message: 'Invalid request',
        error: `Field "source" or "sourceEmail" required`,
      });
    }

    if (body.sourceEmail && !emailPattern.test(body.sourceEmail)) {
      return manageError({
        res,
        message: 'Invalid request',
        error: `Field "sourceEmail" not correct email`,
      });
    }

    if (!emailPattern.test(body.companyEmail)) {
      return manageError({
        res,
        message: 'Invalid request',
        error: `Field "companyEmail" not correct email`,
      });
    }

    try {
      const fields = { ...body };

      fields.price =
        fields.option1 * PRICE1 +
        fields.option2 * PRICE2 +
        fields.option3 * PRICE3 +
        fields.option4 * PRICE4;

      const id = await createJob(fields);

      sign(
        { id, email: fields.companyEmail },
        secuEnv.secret,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            return console.error(err);
          }
          console.log(token);
          // TODO: send token via email
        }
      );

      res.status(200).json({ message: 'success' });
    } catch (error) {
      manageError({ res, status: 500, message: 'Internal error', error });
    }
  } else {
    manageError({ res, message: 'Invalid request', error: { method: req.method, body: req.body } });
  }
};
