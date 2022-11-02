import Layout from '@components/layout';
import Link from '@components/link';
import Page from '@components/page';
import siteData from '@lib/siteData';

export default function Contact() {
  return (
    <Layout title="Contact">
      <Page>
        <h1>Contactez-nous&nbsp;!</h1>
        <p>Vous souhaitez nous laisser un commentaire, une remarque&nbsp;?</p>
        <p>Ou nous contacter pour toute autre demande&nbsp;?</p>
        <p>
          Vous pouvez nous écrire sur{' '}
          <Link blank href={`https://twitter.com/${siteData.twitter}`}>
            Twitter
          </Link>{' '}
          ou par <Link href={`mailto:${siteData.email}`}>e-mail</Link>.
        </p>
      </Page>
    </Layout>
  );
}
