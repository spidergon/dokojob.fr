// import { createJob, createUser, selectUsers, updateUser } from '@api/base';
import { emailPattern, PRICE1, PRICE2, PRICE3, PRICE4 } from '@utils/constant';
// import { getCredentials } from '@api/auth';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const response = (status, message, error) => {
    if (error) console.error('Error: ', { status, message, error });
    res.status(status).json({ status, message });
  };

  if (req.method !== 'POST') {
    return response(400, 'Invalid request', { method: req.method, body: req.body });
  }

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
      return response(400, 'Invalid request', `Field "${field}" required`);
    }
  }

  if (!body.source && !body.sourceEmail) {
    return response(400, 'Invalid request', `Field "source" or "sourceEmail" required`);
  }

  if (body.sourceEmail && !emailPattern.test(body.sourceEmail)) {
    return response(400, 'Invalid request', `Field "sourceEmail" not correct email`);
  }

  if (!emailPattern.test(body.companyEmail)) {
    return response(400, 'Invalid request', `Field "companyEmail" not correct email`);
  }

  const fields = { ...body };

  fields.price =
    fields.option1 * PRICE1 +
    fields.option2 * PRICE2 +
    fields.option3 * PRICE3 +
    fields.option4 * PRICE4;

  try {
    // await createJob(fields);

    // const { authLinkToken, authLinkExpires } = getCredentials();

    // const users = await selectUsers(
    //   ['authLinkToken', 'authLinkExpires'],
    //   `{email} = '${body.companyEmail}'`
    // );

    // if (!users.length) {
    //   await createUser({
    //     email: body.companyEmail,
    //     authLinkToken,
    //     authLinkExpires,
    //   });
    // } else {
    //   await updateUser(users[0].id, { authLinkToken, authLinkExpires });
    // }

    // console.log(users, users[0].id, authLinkToken, authLinkExpires);

    res.status(200).json({ message: 'success' });
  } catch (error) {
    response(500, 'Internal error', error);
  }
};
