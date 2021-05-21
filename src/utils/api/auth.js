import crypto from 'crypto';

export const getCredentials = () => ({
  authLinkToken: crypto.randomBytes(20).toString('hex'),
  authLinkExpires: Date.now() + 3600000,
});
