import Layout from '@components/layout';
import Hero from '@components/home/hero';
import Jobs from '@components/home/jobs';
import CarbonBadge from '@components/carbonBadge';

export default function Home() {
  return (
    <Layout title="Votre emploi numérique en Outre-mer">
      <Hero />
      <Jobs />
      <CarbonBadge />
    </Layout>
  );
}
