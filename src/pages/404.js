import HomeLink from '@components/homeLink';
import Layout from '@components/layout';
import Page from '@components/page';

export default function FourOhFour() {
  return (
    <Layout title="Page inexistante">
      <Page>
        <h1>Oups ! Page inexistante</h1>
        <HomeLink />
      </Page>
    </Layout>
  );
}
