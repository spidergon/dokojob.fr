import { useState } from 'react';
import { useMyState } from '@utils/publishState';
import compress from '@utils/compress';

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
    <div className="logo">
      {error && <p className="error">{error}</p>}

      <div className="flex">
        {src && (
          <div className="logo-img">
            <button className="delete" title="Effacer" type="button" onClick={deleteHandle}>
              <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <img alt="" src={src} onLoad={({ target }) => URL.revokeObjectURL(target.src)} />
          </div>
        )}
        <div className="logo-btn">
          <input accept="image/*" id="file" type="file" onChange={uploadHandle} />
          {!src && (
            <>
              <button
                className="btn"
                disabled={loading}
                type="button"
                onClick={() => document.getElementById('file').click()}
              >
                {(!loading && 'Ajouter votre logo') || 'Chargement...'}
              </button>
              <p className="helperText">
                {
                  'Téléverser le logo de votre entreprise (taille < 2 MB, dimensions recommendées : 64x64)'
                }
              </p>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        .logo {
          margin-top: 0.5em;
        }
        .logo-img {
          width: 90px;
          height: 90px;
          border: 1px solid #333;
        }
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .delete {
          position: absolute;
          top: -10px;
          right: -10px;
          border: 1px solid #ddd;
          border-radius: 50%;
          padding: 0;
          background: #fff;
          width: 24px;
          height: 24px;
          z-index: 1;
        }
        input {
          display: none;
        }
        .btn {
          text-transform: none;
          margin-bottom: 0.5em;
        }
        .error {
          margin-bottom: 0.3em;
        }
      `}</style>
    </div>
  );
}
