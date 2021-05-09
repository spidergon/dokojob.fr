import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export default function Header({ title }) {
  const { pathname } = useRouter();

  return (
    <header className={pathname === '/' ? 'home' : ''}>
      <div className="wrapper container flex">
        <Link href="/">
          <a className="title">{title}</a>
        </Link>
        <Link href="/publier-annonce/">
          <a className="btn" title="Entreprises / Publier une annonce">
            Publier une annonce
          </a>
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
        }
        .title {
          font-size: 2.125rem;
        }
        .btn {
          font-weight: 700;
          padding: 5px 15px;
          border: 1px solid;
          border-radius: 6px;
          text-transform: uppercase;
        }
      `}</style>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
