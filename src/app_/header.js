import { usePathname } from 'next/navigation';
import Link from '@components/link';
import styles from '@styles/layout.module.css';
import siteData from '@lib/siteData';

export default function Header() {
  const pathname = usePathname();

  const headerClass = `${styles.header} ${pathname === '/' ? styles.home : ''}`;

  return (
    <header className={headerClass}>
      <div className={`flex ${styles.wrapper}`}>
        <Link noprefetch className={styles.title} href="/">
          <i>{siteData.title}</i>
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
