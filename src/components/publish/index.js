import { useState } from 'react';
import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import Company from './company';
import Consent from './consent';
import Details from './details';
import MainInfo from './mainInfo';
import Options from './options';
import Preview from './preview';
import Link from '@components/link';
import { useMyState } from '@utils/publishState';
// import { PRICE1, PRICE2, PRICE3, PRICE4 } from '@utils/constant';
// import { clearStorage } from '@utils/storage';

export default function Publish() {
  const { state } = useMyState();

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [price, setPrice] = useState(0);

  // useEffect(() => {
  //   setPrice(
  //     state.option1 * PRICE1 +
  //       state.option2 * PRICE2 +
  //       state.option3 * PRICE3 +
  //       state.option4 * PRICE4
  //   );
  // }, [state.option1, state.option2, state.option3, state.option4]);

  const createJob = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const slug =
        slugify(state.companyName + '-' + state.title, {
          lower: true,
        }) +
        '-' +
        uuidv4().split('-')[0];

      let logo = '';

      if (state.logo?.raw) {
        const urlencoded = new URLSearchParams();

        urlencoded.append('file', state.logo.raw);
        urlencoded.append('publicId', slug);

        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: urlencoded,
        });

        if (!uploadRes.ok) throw uploadRes;

        const { secure_url } = await uploadRes.json();

        logo = secure_url;
      }

      const body = {
        ...state,
        logo,
        slug,
      };

      const jobsRes = await fetch('/api/jobs', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!jobsRes.ok) throw jobsRes;

      const { message } = await jobsRes.json();

      console.log(message);

      // clearStorage();

      setSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!success && (
        <>
          <Preview />
          <form className="container" onSubmit={createJob}>
            <MainInfo />
            <Options />
            <Details />
            <Company />
            <Consent />
            <div className="createAction center">
              <input
                className="btn"
                disabled={loading}
                type="submit"
                value={!loading ? `Créer mon annonce  ➔  0 €` : 'Chargement...'}
              />
            </div>
          </form>
        </>
      )}

      {success && (
        <div className="container success">
          <h2>Votre annonce a été créée avec succès&nbsp;!</h2>
          <p>
            Nous vous avons envoyé un e-mail à l&rsquo;adresse <strong>{state.companyEmail}</strong>{' '}
            contenant un lien permettant d&rsquo;accéder à votre annonce. Veuillez cliquer sur ce
            lien afin de valider votre compte.
          </p>
          <p>Nous étudierons votre annonce et la publierons aussitôt après validation. </p>
          <Link href="/" style={{ display: 'inline-block', marginTop: '1em' }}>
            ⬅ retour à l&rsquo;accueil
          </Link>
        </div>
      )}

      <style global jsx>{`
        .group {
          background: #fff;
          margin-top: 1.5em;
          padding: 1em;
          border-radius: 6px;
          border: 1px solid #ddd;
        }
        .group h2 {
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
          text-transform: uppercase;
          text-decoration: underline;
        }
        .group h3 {
          font-weight: 700;
          margin-bottom: 0.5em;
        }
        .optionGroup {
          display: flex;
          flex-direction: column;
          margin-top: 1.5em;
        }
        .helperText {
          font-size: 14px;
          line-height: 1.66;
          letter-spacing: 0.03em;
          color: rgba(0, 0, 0, 0.54);
        }
        .createAction {
          position: sticky;
          margin-top: 2em;
          bottom: 0;
          background: var(--white);
          padding-bottom: 1em;
        }
      `}</style>

      <style jsx>{`
        .success {
          margin-top: 2em;
        }
        .success h2 {
          font-size: 20px;
        }
        .success p {
          margin: 1em 0 0.5em;
        }
      `}</style>
    </>
  );
}
