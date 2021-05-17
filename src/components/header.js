import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from '@components/link';

export default function Header({ title }) {
  const { pathname } = useRouter();

  return (
    <header className={pathname === '/' ? 'home' : ''}>
      <div className="wrapper flex">
        <Link className="title" href="/">
          {title}
        </Link>
        <Link className="btn" href="/publier-annonce/" title="Entreprises / Publier une annonce">
          Publier une annonce
        </Link>
      </div>

      <style jsx>{`
        header {
          border-bottom: 1px solid rgba(151, 151, 151, 0.2);
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
          display: none;
        }
        header.home .btn {
          display: block;
          font-weight: 700;
          padding: 5px 15px;
          background-color: transparent;
          border: 1px solid;
          text-transform: uppercase;
          width: initial;
        }
        header .btn:hover,
        header .btn:focus {
          background-color: rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
