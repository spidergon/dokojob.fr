import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import HomeLink from '@components/homeLink';
import JobItem from '@components/jobItem';
import JobSkeleton from '@components/jobSkeleton';
import Layout from '@components/layout';

export default function Job() {
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState('');

  const { isReady, query } = useRouter();

  const manageError = (err) => {
    setLoading(false);
    setError(true);
    if (err) console.error(err);
  };

  useEffect(() => {
    if (isReady && query.id) {
      fetch(`/api/jobs/${query.id}`)
        .then(async (res) => {
          if (!res.ok) return manageError();

          const job = await res.json();

          if (!job.title) return manageError();

          setJob(job);
          setTitle(`${job.title} - ${job.companyName}`);
          setLoading(false);
        })
        .catch((err) => {
          manageError(err);
        });
    }
  }, [isReady, query.id]);

  return (
    <Layout title={title || 'Votre emploi'}>
      <div className="container" style={{ marginTop: '2em' }}>
        {loading && <JobSkeleton />}
        {error && (
          <>
            <p>
              <strong>
                Cette offre d&rsquo;emploi n&rsquo;existe pas ou n&rsquo;est malheureusement plus
                disponible.
              </strong>
            </p>
            <HomeLink />
          </>
        )}
        {job.title && <JobItem open job={job} />}
      </div>
    </Layout>
  );
}
