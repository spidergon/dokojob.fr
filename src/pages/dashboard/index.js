import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from '@components/header';
import siteData from '@utils/siteData';

export default function App() {
  const router = useRouter();

  const [jobs, setJobs] = useState([]);

  async function fetchData(token) {
    try {
      const res = await fetch(`/api/jobs?token=${token}`);

      if (!res.ok) throw res;
      const data = await res.json();

      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchDataCb = useCallback((token) => fetchData(token), []);

  useEffect(() => {
    if (router.isReady && !router.query.token) {
      console.log('NO TOKEN!');
      // router.push('/');
    }
    if (router.query.token) {
      fetchDataCb(router.query.token);
    }
  }, [router, fetchDataCb]);

  return (
    <>
      <Head>
        <title>Tableau de bord | {siteData.title}</title>
      </Head>

      <Header title={siteData.title} />

      <main>
        <p>Dashboard</p>
        {jobs.map((job, index) => {
          return <p key={index}>{job.title}</p>;
        })}
      </main>
    </>
  );
}
