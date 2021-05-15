import Layout from '@components/layout';
import getSiteData from '@utils/siteData';

export default function LegalPage({ siteData }) {
  return (
    <Layout siteData={siteData} title="Votre emploi digital en Outre-mer">
      <h1>Mentions légale</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const siteData = getSiteData();

  return {
    props: {
      siteData,
    },
  };
}
