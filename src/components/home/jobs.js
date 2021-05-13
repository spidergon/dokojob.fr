import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JobItem from '@components/jobItem';
import Filter from '@components/home/filter';
import { scrollToAnchor } from '@utils/tools';

const PER_PAGE = 20;

export default function Jobs({ data }) {
  const [jobs, setJobs] = useState([]);
  const [step, setStep] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setJobs(data);
  }, [data]);

  useEffect(() => {
    setPages(Math.ceil(jobs.length / PER_PAGE));
  }, [jobs]);

  useEffect(() => {
    scrollToAnchor();
  }, [step]);

  return (
    <section id="top-anchor">
      <div className="wrapper">
        <Filter allJobs={data} jobs={jobs} setJobs={setJobs} />
        {step > 0 && (
          <button
            style={{ border: 'none', marginBottom: '2em', padding: 'initial' }}
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
                onClick={() => setStep(step - 1)}
              >
                Précédent
              </button>
              <button
                disabled={step === pages - 1}
                title="Page suivante"
                onClick={() => setStep(step + 1)}
              >
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
        section {
          padding: 20px 0;
        }
        .wrapper {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 1em;
        }
        .pagination {
          margin-top: 2em;
        }
        .pagination p {
          margin-bottom: 1em;
        }
        .buttons {
          justify-content: center;
        }
        .buttons button {
          border: none;
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
