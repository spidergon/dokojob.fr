import Image from 'next/image';
import HeroImg from 'public/img/hero.webp';
import { scrollToAnchor } from '@lib/tools';
import styles from '@styles/home.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          fill
          alt=""
          placeholder="blur"
          sizes="100vw"
          src={HeroImg}
          style={{
            objectFit: 'cover',
          }}
        />
        <div className={`flex ${styles.overlay}`}>
          <div className={styles.bgContent}>
            <h1>
              Votre emploi numérique en <span className="no-wrap">Outre-mer</span>
            </h1>
            <h2>
              Parcourez les offres d’emploi sélectionnées pour vous avec soin, et trouvez le job de
              vos rêves en <span className="no-wrap">Outre-mer&nbsp;!</span>
            </h2>
            <div className={styles.scrollBtnWrap}>
              <button
                aria-label="Scroller vers le bas"
                className={`flex ${styles.scrollBtn}`}
                onClick={scrollToAnchor}
              >
                <svg
                  aria-hidden="true"
                  fill="#fff"
                  focusable="false"
                  style={{ width: '1em', height: '1em' }}
                  viewBox="0 0 24 24"
                >
                  <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
