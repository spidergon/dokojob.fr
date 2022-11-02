import { usePathname } from 'next/navigation';
import Link from '@components/link';
import siteData from '@lib/siteData';
import styles from '@styles/layout.module.css';

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className={styles.footer}>
      <div className={`flex container ${styles.container}`}>
        <div>
          {(!/\/publier-annonce\/?/.test(pathname) && (
            <Link noprefetch href="/publier-annonce/">
              Publier
            </Link>
          )) || <b>Publier</b>}
          {' | '}
          {(!/\/contact\/?/.test(pathname) && (
            <Link noprefetch href="/contact/">
              Contact
            </Link>
          )) || <b>Contact</b>}
          {' | '}
          {(!/\/mentions-legales\/?/.test(pathname) && (
            <Link noprefetch href="/mentions-legales/">
              Mentions légales
            </Link>
          )) || <b>Mentions légales</b>}
        </div>
        <div className={`flex ${styles.socialLinks}`}>
          <Link blank href={`https://twitter.com/${siteData.twitter}`}>
            <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
            </svg>
          </Link>
        </div>
        <div className="copy">
          <p>
            <Link noprefetch href="/">
              <i>{siteData.title}</i>
            </Link>{' '}
            © {new Date().getFullYear()}
            {' - '}Fait avec
            <svg aria-hidden="true" className={styles.love} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            en Guyane
          </p>
        </div>
      </div>
    </footer>
  );
}
