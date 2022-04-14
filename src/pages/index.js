import Layout from '@components/layout';
import Hero from '@components/home/hero';
import Jobs from '@components/home/jobs';

export default function Home() {
  return (
    <Layout title="Votre emploi digital en Outre-mer">
      <Hero />
      <Jobs />
    </Layout>
  );
}
