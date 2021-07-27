import { sign } from 'jsonwebtoken';
import { emailPattern, PRICE1, PRICE2, PRICE3, PRICE4 } from '@utils/constant';
import { createJob, getJobs } from '@utils/api/base';
import { secuEnv } from '@utils/api/env';
import { manageError } from '@utils/api/tools';
import sendEmail from '@utils/api/mail';
import siteData from '@utils/siteData';

export default async function jobsApi(req, res) {
  if (req.method === 'GET') {
    // if (req.query.token) {
    //   try {
    //     const { email } = verify(req.query.token, secuEnv.secret);

    //     const jobs = await getJobsByEmail(email);

    //     res.status(200).json({ jobs });
    //   } catch (error) {
    //     manageError({ res, message: 'Invalid request', error });
    //   }
    // } else {
    try {
      const jobs = await getJobs();

      res.status(200).json({ jobs });
    } catch (error) {
      manageError({ res, status: 500, message: 'Internal error', error });
    }
    // }
  } else if (req.method === 'POST') {
    const { body } = req;

    const requiredFields = [
      'companyName',
      'title',
      'location',
      'contract',
      'description',
      'companyEmail',
      'consent',
      'hostLink',
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

      const hostLink = fields.hostLink;

      delete fields['consent'];
      delete fields['hostLink'];

      const id = await createJob(fields);

      const token = sign({ id, email: fields.companyEmail }, secuEnv.secret, { expiresIn: '1h' });

      // Send token via email
      const to = fields.companyEmail;
      const linkURL = `${hostLink}/validation?token=${token}`;

      const { title } = siteData;

      await sendEmail({
        to,
        subject: `Validez votre annonce sur ${title}`,
        html: `<p>Bonjour</p><br />
                <p>Merci d'avoir créer votre annonce sur <i>${title}</i>&nbsp;!</p>
                <p>Afin de la valider, veuillez cliquer sur le lien suivant :</p>
                <p><a href="${linkURL}" target="_blank" rel="noopener noreferrer">Validez votre annonce !</a></p>
                <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p><br />
                <p>Votre équipe <i>${title}</i></p>`,
      });

      // sign(
      //   { id, email: fields.companyEmail },
      //   secuEnv.secret,
      //   { expiresIn: '1h' },
      //   async (err, token) => {
      //     if (err) {
      //       return console.error(err);
      //     }

      //     // Send token via email
      //     const to = fields.companyEmail;
      //     const linkURL = `${hostLink}/validation?token=${token}`;

      //     const { title } = siteData;

      //     await sendEmail({
      //       to,
      //       subject: `Validez votre annonce sur ${title}`,
      //       html: `<p>Bonjour</p><br />
      //           <p>Merci d'avoir créer votre annonce sur <i>${title}</i>&nbsp;!</p>
      //           <p>Afin de la valider, veuillez cliquer sur le lien suivant :</p>
      //           <p><a href="${linkURL}" target="_blank" rel="noopener noreferrer">Validez votre annonce !</a></p>
      //           <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet e-mail.</p><br />
      //           <p>Votre équipe <i>${title}</i></p>`,
      //     });
      //   }
      // );

      res.status(200).json({ message: 'success' });
    } catch (error) {
      manageError({ res, status: 500, message: 'Internal error', error });
    }
  } else {
    manageError({ res, message: 'Invalid request', error: { method: req.method, body: req.body } });
  }
}
