import { useState } from 'react';
import { useMyState } from '@lib/publishState';
import compress from '@lib/compress';
import styles from '@styles/publish.module.css';

export default function Logo() {
  const { state, setState } = useMyState();

  const [src, setSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const showError = (errorMsg) => {
    setError(errorMsg);
    setLoading(false);
  };

  const uploadHandle = async ({ target }) => {
    if (!target.files.length) return;

    setLoading(true);

    const file = target.files[0];

    if (!/^image/i.test(file.type)) return showError('Veuillez ajouter une image valide.');

    const size = (file.size / 1024 / 1024).toFixed(1);

    if (size > 2) return showError("La taille de l'image doit être inférieur à 2 MB.");

    try {
      const { compressedFile, raw } = await compress(file);

      const preview = URL.createObjectURL(compressedFile);

      setSrc(preview);

      compressedFile.preview = preview;
      compressedFile.raw = raw; // value to save into cloud

      setState('logo', compressedFile, false);
      setError('');
    } catch (error) {
      console.error(error);
      setError('Une erreur interne est survenue. Veuillez réessayer ultérieurement.');
    } finally {
      setLoading(false);
    }
  };

  const deleteHandle = () => {
    if (state?.logo?.preview) URL.revokeObjectURL(state.logo.preview);
    document.getElementById('file').value = '';
    setSrc(null);
    setState('logo', null, false);
  };

  return (
    <div className={styles.logo}>
      {error && <p className={`error ${styles.error}`}>{error}</p>}

      <div className="flex">
        {src && (
          <div className={styles.logo_img}>
            <button className={styles.delete} title="Effacer" type="button" onClick={deleteHandle}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            {/* eslint-disable @next/next/no-img-element */}
            <img alt="" src={src} onLoad={({ target }) => URL.revokeObjectURL(target.src)} />
          </div>
        )}
        <div className="logo-btn">
          <input accept="image/*" id="file" type="file" onChange={uploadHandle} />
          {!src && (
            <>
              <button
                className={`btn ${styles.btn}`}
                disabled={loading}
                type="button"
                onClick={() => document.getElementById('file').click()}
              >
                {(!loading && 'Ajouter votre logo') || 'Chargement...'}
              </button>
              <p className={styles.helperText}>
                {
                  'Téléverser le logo de votre entreprise (taille < 2 MB, dimensions recommendées : 64x64)'
                }
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
