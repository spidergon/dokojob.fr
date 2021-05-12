import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import CategoryList from '@components/categoryList';
import purify from '@utils/purify';

export default function JobItem({ job }) {
  return (
    <details>
      <summary className="flex">
        <div className="logo-content">
          {(job.company.logo && (
            <Image
              alt={job.company.name}
              layout="fill"
              objectFit="contain"
              src={job.company.logo}
            />
          )) || <p>{job.company.logoText}</p>}
        </div>
        <div className="job-content">
          <p>{job.company.name}</p>
          <h3>
            <Link href="/">
              <a>{job.title}</a>
            </Link>
          </h3>
          <CategoryList items={[job.location.label, job.contract.code]} />
        </div>
        <div className="job-date">
          <p className="no-wrap">{job.createdAt}</p>
        </div>
      </summary>

      <div className="content">
        <p
          dangerouslySetInnerHTML={{
            __html: purify(job.description.replace(/(?:\r\n|\r|\n)/g, '<br>')),
          }}
        />
        <div
          style={{
            width: '50px',
            height: '1px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            marginTop: '1rem',
          }}
        />
        <p style={{ fontSize: '14px', margin: '0.5rem 0' }}>
          {job.contract.code} - {job.contract.label}
        </p>
        {job.salary && (
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}>Salaire : {job.salary}</p>
        )}
        {job.company.url && (
          <p>
            <a
              aria-label={`${job.company.url} (s’ouvre dans un nouvel onglet)`}
              className="styled"
              href={job.company.url}
              rel="noreferrer noopener nofollow"
              target="_blank"
            >
              {job.company.name}
            </a>
          </p>
        )}
        <div className="action">
          <a
            aria-label={`${job.source} (s’ouvre dans un nouvel onglet)`}
            className="btn"
            href={job.source}
            rel="noreferrer noopener nofollow"
            target="_blank"
          >
            <strong>Soumettre votre candidature</strong>
          </a>
        </div>
      </div>

      <style jsx>{`
        details {
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          padding-bottom: 1em;
          margin-bottom: 1em;
        }
        summary {
          align-items: center;
          cursor: pointer;
        }
        .content {
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          margin-top: 1em;
          padding: 1.5em 0 2em;
        }
        .action {
          text-align: center;
          margin-top: 2em;
        }
        .action .btn {
          width: 100%;
        }
        .logo-content {
          display: none;
        }
        .job-content {
          flex-grow: 1;
        }
        .job-content a {
          color: var(--black);
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
        @media (min-width: 601px) {
          .content {
            padding: 1.5em 1.5em 2em;
          }
          .action .btn {
            width: initial;
          }
        }
      `}</style>
    </details>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
};
