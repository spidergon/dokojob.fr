export function manageError({ res, status = 400, message, error }) {
  if (error) console.error('Error: ', { status, message, error });
  res.status(status).json({ status, message });
}
