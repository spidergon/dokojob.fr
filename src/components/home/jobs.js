import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import JobItem from '@components/jobItem';
import Filter from './filter';
import { scrollToAnchor } from '@lib/tools';

const PER_PAGE = 30;

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [step, setStep] = useState(0);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const { data, error } = useSWR('/api/jobs', fetcher);

  const canScroll = useRef(false);

  useEffect(() => {
    if (data?.jobs) {
      setJobs(data.jobs);
      setAllJobs(data.jobs);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  useEffect(() => {
    setPages(Math.ceil(jobs.length / PER_PAGE));
    setStep(0);
  }, [jobs]);

  useEffect(() => {
    if (canScroll.current) {
      canScroll.current = false;
      scrollToAnchor();
    }
  }, [step]);

  return (
    <section id="top-anchor">
      <div className="container">
        <Filter allJobs={allJobs} jobs={jobs} setJobs={setJobs} />

        {loading && !error && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="placeholder"></div>
            ))}
          </>
        )}

        {error && (
          <p className="error center">
            Une erreur interne est survenue. Veuillez réessayer ultérieurement.
          </p>
        )}

        {!loading && (
          <>
            {step > 0 && (
              <button
                style={{ marginBottom: '2em', padding: 'initial' }}
                title="Retourner à la page précédente"
                onClick={() => setStep(step - 1)}
              >
                ⬅ page précédente
              </button>
            )}
            {jobs.slice(step * PER_PAGE, step * PER_PAGE + PER_PAGE).map((job, index) => (
              <JobItem key={`${index}${job.id}`} job={job} />
            ))}
            <div className="pagination center">
              <p>
                {(pages !== 0 && (
                  <>
                    Page {step + 1} / {pages}
                  </>
                )) || <strong>Aucun résultat, veuillez modifier votre sélection.</strong>}
              </p>
              {pages > 1 && (
                <div className="buttons flex">
                  <button
                    disabled={step === 0}
                    title="Page précédente"
                    onClick={() => {
                      canScroll.current = true;
                      setStep(step - 1);
                    }}
                  >
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                      <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z" />
                    </svg>
                    Précédent
                  </button>
                  <button
                    disabled={step === pages - 1}
                    title="Page suivante"
                    onClick={() => {
                      canScroll.current = true;
                      setStep(step + 1);
                    }}
                  >
                    Suivant
                    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        section {
          padding: 20px 0;
        }
        .pagination {
          margin-top: 2em;
        }
        .pagination p {
          margin-bottom: 1em;
        }
        .buttons {
          justify-content: center;
          gap: 0.5em;
        }
        button {
          border: none;
          background: inherit;
        }
        .buttons button {
          display: flex;
        }
        .buttons button svg {
          width: 1.5em;
        }
        .buttons button[disabled] svg {
          fill: rgba(0, 0, 0, 0.3);
        }
        .placeholder {
          height: 100px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 1em;
          --shine: white;
          --background: #efefef;
          background-image: linear-gradient(
            90deg,
            var(--background) 0px,
            var(--shine) 40px,
            var(--background) 80px
          );
          background-size: 500px;
          animation: shine 1s infinite linear;
        }
        @keyframes shine {
          from {
            background-position: 200%;
          }
          to {
            background-position: -40px;
          }
        }
        @media (min-width: 601px) {
          section {
            padding: 40px 0;
          }
        }
      `}</style>
    </section>
  );
}
