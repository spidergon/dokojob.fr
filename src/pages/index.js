import Layout from '@components/layout';
import { getJobs } from '@utils/jobs';
import getSiteData from '@utils/siteData';
import Hero from '@components/home/hero';
import Jobs from '@components/home/jobs';

export default function Home({ allJobsData, siteData }) {
  return (
    <Layout siteData={siteData} title="Votre emploi digital en Outre-mer">
      <Hero />
      <Jobs data={allJobsData} />
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
