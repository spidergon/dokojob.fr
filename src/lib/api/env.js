export const airtableEnv = {
  apiKey: process.env.AIRTABLE_API_KEY,
  baseId: process.env.AIRTABLE_BASE_ID,
};

export const cloudinaryEnv = {
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESET,
  url: process.env.CLOUDINARY_URL,
};

export const secuEnv = {
  secret: process.env.SECRET,
  runSecret: process.env.RUN_SECRET,
};

export const REDIS_URL = process.env.REDIS_URL;

export const mailEnv = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 587,
  user: process.env.MAIL_USER,
  pass: process.env.MAIL_PASS,
  from: process.env.MAIL_FROM,
};
