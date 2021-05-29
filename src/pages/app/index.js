import Head from 'next/head';
import Header from '@components/header';
import siteData from '@utils/siteData';

export default function App() {
  return (
    <>
      <Head>
        <title>Tableau de bord | {siteData.title}</title>
      </Head>

      <Header title={siteData.title} />

      <main>App</main>
    </>
  );
}
