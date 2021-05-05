import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from '@styles/header.module.css';

export default function Header({ title }) {
  const { pathname } = useRouter();

  const isHome = pathname === '/';

  return (
    <header
      style={{
        position: isHome ? 'absolute' : '',
        borderBottom: !isHome ? '1px solid rgba(151, 151, 151, 0.2)' : '',
        width: '100%',
      }}
    >
      <div className={`${styles.wrapper} container flex`}>
        <Link href="/">
          <a className={styles.title}>{title}</a>
        </Link>
        <Link href="/publier-annonce/">
          <a
            className={styles.btn}
            // style={{
            //   color: isHome ? '#fff' : '',
            // }}
            title="Entreprises / Publier une annonce"
          >
            Publier une annonce
          </a>
        </Link>
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
