import PropTypes from 'prop-types';
import Link from '@components/link';

export default function Footer({ socials }) {
  return (
    <footer>
      <div className="container flex">
        <div>
          <Link href="/publier-annonce/">Publier</Link>
          {' | '}
          <Link href="/mentions-legales/">Mentions légales</Link>
        </div>
        <div className="socialLinks flex">
          <Link blank href={`https://twitter.com/${socials.twitter}`}>
            {/* <svg
              aria-hidden="true"
              role="img"
              viewBox="0 48.08202362060547 511.99798583984375 415.83697509765625"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </svg> */}
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </Link>
          {/* <Link blank href={`https://www.facebook.com/${socials.fb}`}>
            <svg
              aria-hidden="true"
              role="img"
              viewBox="22.889999389648438 0 274.219970703125 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
            </svg>
          </Link> */}
        </div>
        <div className="copy">
          <p>
            © {new Date().getFullYear()}
            {' - '}Fait avec
            <svg aria-hidden="true" className="love" viewBox="0 0 24 24">
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
          border-top: solid 1px var(--border-color);
        }
        svg {
          height: 1.5em;
          width: 1.5em;
        }
        .container {
          flex-direction: column;
          align-items: center;
          gap: 1em;
        }
        .love {
          fill: red;
          vertical-align: sub;
          margin: 0 5px;
          height: 1.25em;
          width: 1.25em;
        }
        @media (min-width: 768px) {
          .container {
            flex-direction: row;
            justify-content: space-between;
            padding: 0 1em;
          }
        }
      `}</style>

      <style global jsx>{`
        footer a {
          color: var(--black);
        }
        footer a:hover svg,
        footer a:focus svg {
          fill: rgb(44, 56, 126);
        }
        footer .socialLinks a {
          display: flex;
          padding: 0.5em;
        }
      `}</style>
    </footer>
  );
}

Footer.propTypes = {
  socials: PropTypes.object.isRequired,
};
