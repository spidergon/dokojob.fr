import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import JobItem from '@components/jobItem';
import Filter from './filter';
import { scrollToAnchor } from '@utils/tools';

const PER_PAGE = 20;

export default function Jobs({ data }) {
  const [jobs, setJobs] = useState([]);
  const [step, setStep] = useState(0);
  const [pages, setPages] = useState(1);

  const canScroll = useRef(false);

  useEffect(() => {
    setJobs(data);
  }, [data]);

  useEffect(() => {
    setPages(Math.ceil(jobs.length / PER_PAGE));
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
        <Filter allJobs={data} jobs={jobs} setJobs={setJobs} />
        {step > 0 && (
          <button
            style={{ marginBottom: '2em', padding: 'initial' }}
            title="Retourner à la page précédente"
            onClick={() => setStep(step - 1)}
          >
            ⬅ page précédente
          </button>
        )}
        {jobs.slice(step * PER_PAGE, step * PER_PAGE + PER_PAGE).map((job, index) => {
          return <JobItem key={index} job={job} />;
        })}
        <div className="pagination center">
          <p>
            Page {step + 1} / {pages}
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
        @media (min-width: 601px) {
          section {
            padding: 40px 0;
          }
        }
      `}</style>
    </section>
  );
}

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};
