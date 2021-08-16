import Image from 'next/image';
import HeroImg from 'public/img/hero.webp';
import { scrollToAnchor } from '@lib/tools';

export default function Hero() {
  return (
    <section>
      <div className="bgWrap">
        <Image alt="" layout="fill" objectFit="cover" placeholder="blur" src={HeroImg} />
        <div className="overlay flex">
          <div className="bgContent">
            <h1>
              Votre emploi numérique en <span className="no-wrap">Outre-mer</span>
            </h1>
            <h2>
              Parcourez les offres d’emploi sélectionnées pour vous avec soin, et trouvez le job de
              vos rêves en <span className="no-wrap">Outre-mer&nbsp;!</span>
            </h2>
            {/* <p>
              <Link noprefetch href="/publier-annonce/">
                <strong>Entreprises : Publiez votre annonce</strong>
              </Link>{' '}
              et trouvez votre prochain talent. C’est gratuit&nbsp;!
            </p> */}
          </div>
        </div>
        <div className="scrollBtnWrap">
          <button
            aria-label="Scroller vers le bas"
            className="scrollBtn flex"
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

      <style jsx>{`
        .bgWrap {
          height: 100vh;
        }
        .overlay {
          justify-content: center;
          align-items: center;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .bgContent {
          color: #fff;
          max-width: 736px;
          padding: 2em;
          text-align: center;
        }
        h1 {
          font-size: 2rem;
          letter-spacing: 0.00938em;
          text-transform: uppercase;
          margin-bottom: 1em;
        }
        h2 {
          font-size: 1.25rem;
          font-weight: 500;
          line-height: 1.6;
          letter-spacing: 0.0075em;
          margin-bottom: 2em;
        }
        p {
          letter-spacing: 0.00938em;
        }
        .scrollBtnWrap {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 1em;
        }
        .scrollBtn {
          font-size: 1.5rem;
          background: rgba(0, 0, 0, 0.3);
          color: #fff;
          padding: 12px;
          border: 0;
          border-radius: 50%;
          animation: bounce 1s ease-in-out;
          cursor: pointer;
        }
        @media (min-width: 601px) {
          .bgWrap {
            height: 50vh;
          }
          .scrollBtnWrap {
            display: none;
          }
        }
        @media (max-height: 700px) {
          .bgWrap {
            height: 100vh;
          }
          .scrollBtnWrap {
            display: block;
          }
        }
        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </section>
  );
}
