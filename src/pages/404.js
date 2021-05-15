import Layout from '@components/layout';
import Link from '@components/link';
import getSiteData from '@utils/siteData';

export default function FourOhFour({ siteData }) {
  return (
    <Layout siteData={siteData} title="Votre emploi digital en Outre-mer">
      <h1>Oups ! Page inexistante</h1>
      <p>
        <Link href="/">⬅ Retourner à la page d&rsquo;accueil</Link>
      </p>
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
