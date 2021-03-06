import { cloudinaryEnv } from '@lib/api/env';
import { manageError } from '@lib/api/tools';

export default async function handler(req, res) {
  if (req.method !== 'POST' || !req?.body?.file) {
    return manageError({
      res,
      message: 'Invalid request',
      error: { method: req.method, body: req.body },
    });
  }

  try {
    const urlencoded = new URLSearchParams();

    urlencoded.append('file', req.body.file);
    urlencoded.append('public_id', req.body.publicId);
    urlencoded.append('upload_preset', cloudinaryEnv.uploadPreset);

    const response = await fetch(cloudinaryEnv.url, {
      method: 'POST',
      body: urlencoded,
    });

    if (!response.ok) throw response;

    const { secure_url } = await response.json();

    res.status(200).json({ message: 'success', secure_url });
  } catch (error) {
    manageError({ res, status: 500, message: 'Internal error', error });
  }
}
