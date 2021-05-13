import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import JobItem from '@components/jobItem';
import Filter from '@components/home/filter';

export default function Jobs({ data }) {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    setJobs(data);
  }, [data]);

  return (
    <section id="top-anchor">
      <div className="wrapper">
        <Filter allJobs={data} jobs={jobs} setJobs={setJobs} />
        {jobs.map((job, index) => {
          return <JobItem key={index} job={job} />;
        })}
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 900px;
          margin: 20px auto;
          padding: 0 1em;
        }
        @media (min-width: 601px) {
          .wrapper {
            margin: 40px auto;
          }
        }
      `}</style>
    </section>
  );
}

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};
