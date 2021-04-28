import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { getJobs } from '../lib/jobs';

export default function Home({ allJobsData }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jobs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Jobs</h1>

        <ul>
          {allJobsData.map(({ id, slug, createdAt }) => {
            return (
              <li key={id}>
                <Link href={`/jobs/${slug}`}>
                  <a>
                    {slug}-{createdAt}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allJobsData = await getJobs();
  return {
    props: {
      allJobsData
    }
  };
}
