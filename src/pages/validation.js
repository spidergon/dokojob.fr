import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HomeLink from '@components/homeLink';
import Layout from '@components/layout';
import Page from '@components/page';

export default function Validation() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  const fetchDataCb = useCallback(
    async (token) => {
      try {
        const res = await fetch(`/api/check?token=${token}`);

        if (!res.ok) throw res;
        const { id, email } = await res.json();

        if (id && email) {
          setLoading(false);
          setSuccess(true);
        }
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    },
    [router]
  );

  useEffect(() => {
    if (router.isReady && !router.query.token) {
      router.push('/');
    }

    if (!success && router.query.token) {
      setLoading(true);
      fetchDataCb(router.query.token);
    }
  }, [router, fetchDataCb, success]);

  return (
    <Layout title="Validation">
      <Page>
        {loading && <h2>Validation...</h2>}
        {success && (
          <>
            <h1>Votre annonce a été validée avec succès !</h1>
            <p>Nous étudierons votre annonce et la publierons aussitôt.</p>
            <HomeLink />
          </>
        )}
      </Page>
    </Layout>
  );
}
