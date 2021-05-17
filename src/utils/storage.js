const storageName = 'job_tKGN783@';

export function getStorage(key = null) {
  if (typeof window === 'undefined') return ''; // Server side rendering check
  try {
    const storage = JSON.parse(sessionStorage.getItem(storageName));

    if (!storage) return '';
    if (key) return storage[key];

    return storage;
  } catch (error) {
    console.error(error);

    return '';
  }
}

export function setStorage(key, value) {
  if (typeof window === 'undefined') return;
  try {
    let storage = JSON.parse(sessionStorage.getItem(storageName));

    if (storage) {
      if (typeof key === 'object') storage = { ...storage, ...key };
      else storage[key] = value;
    } else storage = { [key]: value };
    sessionStorage.setItem(storageName, JSON.stringify(storage));
  } catch (error) {
    console.error(error);
  }
}
