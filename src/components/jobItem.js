import Image from 'next/image';
import PropTypes from 'prop-types';
import CategoryList from './categoryList';

export default function JobItem({ job, lazy, onClick }) {
  return (
    <div className="wrapper flex">
      <div className="logo-content">
        {(job.company.logo && (
          <Image alt={job.company.name} layout="fill" objectFit="contain" src={job.company.logo} />
        )) || <p>{job.company.logoText}</p>}
      </div>
      <div className="job-content">
        <p>{job.company.name}</p>
        <h3>{job.title}</h3>
        <CategoryList items={[job.location.label, job.contract.code]} />
      </div>
      <div className="job-date">
        <p className="no-wrap">{job.createdAt}</p>
      </div>
      <style jsx>{`
        .wrapper {
          align-items: center;
          padding-bottom: 1em;
          margin-bottom: 1em;
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }
        .logo-content {
          display: none;
        }
        .job-content {
          flex-grow: 1;
        }
        @media (min-width: 481px) {
          .logo-content {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 4rem;
            min-height: 4rem;
            margin-right: 1em;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
          }
          .logo-content p {
            color: rgba(0, 0, 0, 0.5);
            font-weight: 700;
            font-size: 1.5em;
          }
        }
      `}</style>
    </div>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  lazy: PropTypes.bool,
  onClick: PropTypes.func,
};
