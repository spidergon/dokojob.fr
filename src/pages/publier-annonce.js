import Layout from '@components/layout';
import getSiteData from '@utils/siteData';

export default function Home({ siteData }) {
  return (
    <Layout siteData={siteData} title="Publiez votre nouvelle offre d'emploi">
      Publier votre annonce
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
