import Layout from '@components/layout';
import Page from '@components/page';
import siteData from '@lib/siteData';

const { title, email } = siteData;

export default function LegalPage() {
  return (
    <Layout title="Mentions légales">
      <Page>
        <h1>Mentions légales</h1>
        <p>
          Conformément aux dispositions des Articles 6-III et 19 de la Loi n°2004-575 du 21 juin
          2004 pour la Confiance dans l’économie numérique, dite L.C.E.N., il est porté à la
          connaissance des Utilisateurs du site {title} les présentes mentions légales. La connexion
          et la navigation sur le site ({title}) par l’Utilisateur implique acceptation intégrale et
          sans réserve des présentes mentions légales. Ces dernières sont accessibles sur le site à
          la rubrique « Mentions légales ».
        </p>
        <h2>Article 1 : L’éditeur</h2>
        <p>
          L’édition du site {title} est assurée par la Société (micro entreprise) sous le numéro
          522948256 dont le siège social est situé à Cayenne, adresse e-mail : {email}. Le Directeur
          de la publication est Christopher SERVIUS.
        </p>
        <h2>Article 2 : L’hébergeur</h2>
        <p>
          L’hébergeur du site {title} est la Société Vercel Inc., dont le siège social est situé au
          340 S Lemon Ave #4133, Walnut, CA 91789.
        </p>
        <h2>Article 3 : Accès au site</h2>
        <p>
          Le site est accessible par tout endroit, 7j/7, 24h/24 sauf cas de force majeure,
          interruption programmée ou non et pouvant découlant d’une nécessité de maintenance. En cas
          de modification, interruption ou suspension des services, le site {title} ne saurait être
          tenu responsable.
        </p>
        <h2 id="privacy">Article 4 : Collecte des données</h2>
        <p>
          Le site assure à l’Utilisateur une collecte et un traitement d’informations personnelles
          dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 modifiée
          en 2004 relative à l’informatique, aux fichiers et aux libertés.
        </p>
        <p>
          En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l’Utilisateur
          dispose d’un droit d’accès, de rectification, de suppression et d’opposition de ses
          données personnelles. L’Utilisateur exerce ce droit :
        </p>
        <ul>
          <li>par e-mail à l’adresse {email}</li>
        </ul>
        <h2>Article 5 : Cookies</h2>
        <p>
          Un cookie est un élément qui ne permet pas d’identifier l’Utilisateur, mais sert à
          enregistrer des informations relatives à la navigation de celui-ci sur le site Internet.
          L’Utilisateur peut désactiver les cookies par l’intermédiaire des paramètres figurant au
          sein de son logiciel de navigation.
        </p>
        <h2>Article 6 : Propriété intellectuelle</h2>
        <p>
          Toute utilisation, reproduction, diffusion, commercialisation, modification de toute ou
          partie du site {title}, sans autorisation de l’Éditeur est prohibée et pourra entraîner
          des actions et poursuites judiciaires telles que notamment prévues par le Code de la
          propriété intellectuelle et le Code civil.
        </p>
      </Page>
    </Layout>
  );
}
