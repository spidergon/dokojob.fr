import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Link from '@components/link';
import styles from '@styles/layout.module.css';

export default function Header({ title }) {
  const { pathname } = useRouter();

  const headerClass = `${styles.header} ${pathname === '/' ? styles.home : ''}`;

  return (
    <header className={headerClass}>
      <div className={`flex ${styles.wrapper}`}>
        <Link noprefetch className={styles.title} href="/">
          <i>{title}</i>
        </Link>
        {!/\/publier-annonce\/?/.test(pathname) && (
          <Link
            noprefetch
            className={`btn ${styles.btn}`}
            href="/publier-annonce/"
            title="Entreprises / Publier une annonce"
          >
            Publier<span> une annonce</span>
          </Link>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
