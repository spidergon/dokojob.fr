import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import { htmlToText } from 'html-to-text';
import { mailEnv } from './env';
import purify from '@utils/purify';

const { host, port, user, pass, from } = mailEnv;

const transport = nodemailer.createTransport(
  smtpTransport({
    host,
    port,
    secure: Number(port) === 465,
    auth: { user, pass },
  })
);

transport.verify((error) => {
  if (error) console.error('SMTP conf error: ', error);
});

export default async function sendEmail({ to, subject, html }) {
  const cleanHtml = purify(html);

  console.log(transport);

  return transport.sendMail({
    from,
    to,
    subject,
    html: cleanHtml,
    text: htmlToText(cleanHtml),
  });
}
