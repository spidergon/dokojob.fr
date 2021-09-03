import PropTypes from 'prop-types';

export default function JobSkeleton({ nb = 1 }) {
  return (
    <>
      {[...Array(nb).keys()].map((i) => (
        <div key={i} className="skel flex">
          <div className="logo"></div>
          <div className="content">
            <div className="company"></div>
            <div className="title"></div>
            <div className="loc"></div>
            <div className="type"></div>
          </div>
        </div>
      ))}
      <style jsx>{`
        .skel {
          padding: 0.5em;
          align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
          margin-bottom: 1em;
        }
        .logo {
          display: none;
        }
        .content {
          flex-grow: 1;
        }
        .company,
        .title {
          max-width: 200px;
          height: 1em;
          margin-bottom: 10px;
        }
        .title {
          max-width: 500px;
          height: 1.2em;
        }
        .loc,
        .type {
          display: inline-block;
          width: 100px;
          height: 1.4em;
          border-radius: 16px;
        }
        .type {
          width: 50px;
          margin-left: 1em;
        }
        .logo,
        .content div {
          animation: shine 1s linear infinite alternate;
        }
        @media (min-width: 481px) {
          .logo {
            display: block;
            width: 4rem;
            height: 4rem;
            margin-right: 1em;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
          }
        }
        @keyframes shine {
          from {
            background-color: rgba(0, 0, 0, 0.1);
          }
          to {
            background-color: rgba(0, 0, 0, 0.25);
          }
        }
      `}</style>
    </>
  );
}

JobSkeleton.propTypes = { nb: PropTypes.number };
