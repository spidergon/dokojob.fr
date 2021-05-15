import PropTypes from 'prop-types';
import Link from '@components/link';

export default function Footer({ socials, title }) {
  return (
    <footer>
      <div className="wrapper flex">
        <div className="socialLinks flex">
          <Link blank href={`https://twitter.com/${socials.twitter}`}>
            <i className="bx bxl-twitter bx-sm" />
          </Link>
          <Link blank href={`https://www.facebook.com/${socials.fb}`}>
            <i className="bx bxl-facebook bx-sm" />
          </Link>
          <Link href={`mailto:${socials.email}`}>
            <i className="bx bx-envelope bx-sm" />
          </Link>
        </div>
        <div>
          <Link href="/publier-annonce/">Publier</Link>
          {' | '}
          <Link href="/mentions-legales/">Mentions légales</Link>
        </div>
        <div>
          <p>
            © {new Date().getFullYear()} <Link href="/">{title}</Link>
            {' - '}
            Fait avec
            <svg aria-hidden="true" className="love" focusable="false" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            en Guyane
          </p>
        </div>
      </div>

      <style jsx>{`
        footer {
          margin-top: 3em;
          padding: 1.5em 0;
          border-top: solid 1px rgba(151, 151, 151, 0.2);
        }
        .wrapper {
          flex-direction: column;
          align-items: center;
          gap: 1em;
        }
        .love {
          fill: red;
          height: 20px;
          vertical-align: sub;
          margin: 0 5px;
        }
      `}</style>
      <style global jsx>{`
        footer a {
          color: var(--black);
        }
        footer .socialLinks a {
          text-decoration: none;
          display: flex;
          padding: 0.5em;
        }
      `}</style>
    </footer>
  );
}

Footer.propTypes = {
  socials: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};
