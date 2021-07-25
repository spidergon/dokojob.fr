import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layout';

export default function Connexion() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function fetchData(token) {
    try {
      const res = await fetch(`/api/auth?token=${token}`);

      if (!res.ok) throw res;
      const { payload } = await res.json();

      console.log(payload);
      // TODO: add payload to cookie
      // router.push('/dashboard');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const fetchDataCb = useCallback((token) => fetchData(token), []);

  useEffect(() => {
    if (router.query.token) {
      setLoading(true);
      fetchDataCb(router.query.token);
    }
  }, [router, fetchDataCb]);

  return (
    <Layout title="Votre emploi digital en Outre-mer">
      {(loading && <h1>Chargement...</h1>) || <p>Connexion</p>}
    </Layout>
  );
}
