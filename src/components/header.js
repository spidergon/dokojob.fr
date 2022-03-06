import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from '@components/link';

export default function Header({ title }) {
  const { pathname } = useRouter();

  return (
    <header className={pathname === '/' ? 'home' : ''}>
      <div className="wrapper flex">
        <Link noprefetch className="title" href="/">
          <i>{title}</i>
        </Link>
        {!/\/publier-annonce\/?/.test(pathname) && (
          <Link
            noprefetch
            className="btn"
            href="/publier-annonce/"
            title="Entreprises / Publier une annonce"
          >
            Publier<span> une annonce</span>
          </Link>
        )}
      </div>

      <style jsx>{`
        header {
          border-bottom: 1px solid var(--border-color);
        }
        .home {
          position: absolute;
          color: #fff;
          border: none;
          width: 100%;
          z-index: 10;
        }
        .wrapper {
          align-items: center;
          justify-content: space-between;
          height: 64px;
          padding: 0 1em;
        }
      `}</style>
      <style global jsx>{`
        header .title {
          font-size: 2.125rem;
          color: inherit;
          text-decoration: none;
        }
        header .btn {
          display: block;
          font-weight: 700;
          padding: 5px 15px;
          background-color: transparent;
          border: 1px solid;
          text-transform: uppercase;
          width: initial;
          color: var(--black);
        }
        header .btn span {
          display: none;
        }
        header.home .btn {
          color: inherit;
        }
        header .btn:hover,
        header .btn:focus {
          background-color: rgba(0, 0, 0, 0.3);
        }
        @media (min-width: 481px) {
          header .btn span {
            display: inline;
          }
        }
      `}</style>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
