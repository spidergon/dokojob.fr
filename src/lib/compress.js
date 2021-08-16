async function compress(file) {
  // if (typeof window === 'undefined') return; // Server side rendering check
  // const imageCompression = require('browser-image-compression').default;
  const imageCompression = (await import('browser-image-compression')).default;

  const compressedFile = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 64,
  });

  const raw = await imageCompression.getDataUrlFromFile(compressedFile); // value to save into cloud

  console.log(`File: ${compressedFile.name}`);

  const initSize = file.size / 1024 / 1024;
  const endSize = compressedFile.size / 1024 / 1024;
  const percent = Math.round(initSize / endSize);

  console.log(`Compression (${percent}%): ${initSize} MB => ${endSize} MB`);

  return { compressedFile, raw };
}

export default compress;
