import { cloudinaryEnv } from '@api/env';

export default async (req, res) => {
  const response = (status, message, error) => {
    if (error) console.error('Error: ', { status, message, error });
    res.status(status).json({ status, message });
  };

  if (req.method !== 'POST' || !req?.body?.file) {
    return response(400, 'Invalid request', { method: req.method, body: req.body });
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
    response(500, 'Internal error', error);
  }
};
