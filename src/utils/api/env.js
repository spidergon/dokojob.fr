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
};
