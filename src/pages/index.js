import Layout from '@components/layout';
import { getJobs } from '@utils/jobs';
import Hero from '@components/home/hero';
import Jobs from '@components/home/jobs';

export default function Home({ allJobs }) {
  return (
    <Layout title="Votre emploi digital en Outre-mer">
      <Hero />
      <Jobs data={allJobs} />
    </Layout>
  );
}

export async function getStaticProps() {
  const allJobs = await getJobs();

  return {
    props: { allJobs },
  };
}
