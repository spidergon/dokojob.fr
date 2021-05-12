import PropTypes from 'prop-types';
import JobItem from '@components/jobItem';

export default function Jobs({ data }) {
  return (
    <section id="top-anchor">
      <div className="wrapper">
        {data.map((job, index) => {
          return <JobItem key={index} job={job} />;
        })}
      </div>
      <style jsx>{`
        .wrapper {
          max-width: 900px;
          margin: 50px auto;
          padding: 0 2em;
        }
      `}</style>
    </section>
  );
}

Jobs.propTypes = {
  data: PropTypes.array.isRequired,
};
