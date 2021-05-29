import { emailPattern, PRICE1, PRICE2, PRICE3, PRICE4 } from '@utils/constant';
import { createJob, selectAllJobs } from '@utils/api/base';
import { getCredentials } from '@utils/api/auth';
import { manageError } from '@utils/api/tools';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const rawJobs = await selectAllJobs([{ field: 'created' }]);

      const jobs = rawJobs.map((record) => ({ id: record.id, ...record.fields }));

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
      const { authLinkToken, authLinkExpires } = getCredentials();

      const fields = { ...body, authLinkToken, authLinkExpires };

      fields.price =
        fields.option1 * PRICE1 +
        fields.option2 * PRICE2 +
        fields.option3 * PRICE3 +
        fields.option4 * PRICE4;

      const [job] = await createJob(fields);

      res.status(200).json({ id: job.id, message: 'success' });
    } catch (error) {
      manageError({ res, status: 500, message: 'Internal error', error });
    }
  } else {
    manageError({ res, message: 'Invalid request', error: { method: req.method, body: req.body } });
  }
};
