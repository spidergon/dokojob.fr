import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from '@components/header';
import Footer from '@components/footer';
import siteData from '@utils/siteData';

const google = 'https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap';
const boxicons = 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css';

export default function Layout({ children, title }) {
  const { pathname } = useRouter();

  return (
    <>
      <Head>
        {/*
        1. Preemptively warm up the fonts’ origin.

        2. Initiate a high-priority, asynchronous fetch for the CSS file. Works in most modern browsers.

        3. Initiate a low-priority, asynchronous fetch that gets applied to the page only after it’s arrived.
        Works in all browsers with JavaScript enabled.

        4. In the unlikely event that a visitor has intentionally disabled JavaScript, fall back to the original method.
        The good news is that, although this is a render-blocking request, it can still make use of the preconnect which
        makes it marginally faster than the default.
        */}

        {/* [1] */}
        <link crossOrigin="true" href="https://fonts.gstatic.com" rel="preconnect" />

        {/* [2] */}
        <link as="style" href={google} rel="preload" />
        <link as="style" href={boxicons} rel="preload" />

        {/* [3] */}
        <link href={google} media="print" rel="stylesheet" onLoad="this.media='all'" />
        <link href={boxicons} media="print" rel="stylesheet" onLoad="this.media='all'" />

        {/* [4] */}
        <noscript>
          <link href={google} rel="stylesheet" />
          <link href={boxicons} rel="stylesheet" />
        </noscript>

        {/* <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&amp;display=swap" rel="stylesheet" /> */}

        {/* <link
          href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
          media="print"
          rel="stylesheet"
          onLoad="this.media='all';this.onload=null;"
        /> */}

        <link href="/favicon.ico" rel="icon" />

        {/* <link rel="canonical" href="https://epsylon.vercel.app">  */}

        <meta content={siteData.description} name="description" />

        {/* Open Graph */}
        <meta content={title} property="og:title" />
        <meta content={siteData.title} property="og:site_name" />
        <meta content={siteData.description} property="og:description" />
        <meta content={pathname} property="og:url" />
        <meta content="/logo.svg" property="og:image" />

        {/* Twitter */}
        <meta content={`@${siteData.socials.twitter}`} name="twitter:site" />
        <meta content="summary" name="twitter:card" />

        <title>
          {title} | {siteData.title}
        </title>
      </Head>

      <Header title={siteData.title} />

      <main>{children}</main>

      <Footer socials={siteData.socials} title={siteData.title} />
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  /* siteData: PropTypes.shape({
    description: PropTypes.string.isRequired,
    socials: PropTypes.shape({
      twitter: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired, */
  title: PropTypes.string.isRequired,
};
