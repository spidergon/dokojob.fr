import siteData from '@lib/siteData';

const title = 'Votre emploi numérique en Outre-mer';

export default async function Head() {
  return (
    <>
      <link href="/favicon.ico" rel="icon" />

      <link href="https://dokojob.fr" rel="canonical" />

      <meta content={siteData.description} name="description" />

      {/* Open Graph */}
      <meta content={title} property="og:title" />
      <meta content="website" property="og:type" />
      <meta content="/logo.svg" property="og:image" />
      <meta content={siteData.title} property="og:site_name" />
      <meta content={siteData.description} property="og:description" />

      {/* Twitter Card */}
      <meta content="summary" name="twitter:card" />
      <meta content={`@${siteData.twitter}`} name="twitter:site" />

      <title>{`${title} | ${siteData.title}`}</title>
    </>
  );
}
