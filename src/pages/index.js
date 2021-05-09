import Link from 'next/link';
import Layout from '@components/layout';
import { getJobs } from '@utils/jobs';
import getSiteData from '@utils/siteData';
import Hero from '@components/hero';

export default function Home({ allJobsData, siteData }) {
  return (
    <Layout siteData={siteData} title="Votre emploi digital en Outre-mer">
      <Hero />
      <section id="top-anchor">
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
      </section>
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
