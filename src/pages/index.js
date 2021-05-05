import Link from 'next/link';
import Layout from '@components/layout';
// import styles from '@styles/Home.module.css';
import { getJobs } from '@utils/jobs';
import getSiteData from '@utils/siteData';

export default function Home({ allJobsData, siteData }) {
  return (
    <Layout siteData={siteData} title="Votre emploi digital en Outre-mer">
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
    </Layout>
  );
}

export async function getStaticProps() {
  const allJobsData = await getJobs();
  const siteData = getSiteData();

  return {
    props: {
      allJobsData,
      siteData,
    },
  };
}
