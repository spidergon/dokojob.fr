import { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import CategoryList from '@components/categoryList';
import Link from '@components/link';
import { codeToLabel } from '@utils/constant';
import purify from '@utils/purify';

export default function JobItem({ job, preview }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (job.color) {
      const color = job.color.replace('#', '');
      const r = parseInt(color.substr(0, 2), 16);
      const g = parseInt(color.substr(2, 2), 16);
      const b = parseInt(color.substr(4, 2), 16);
      const brightness = Math.round((r * 299 + g * 587 + b * 114) / 1000);

      setDark(brightness <= 130);
    } else {
      setDark(false);
    }
  }, [job.color]);

  return (
    <details>
      <summary
        className={`flex${dark ? ' dark' : ''}`}
        style={{ background: job.color || 'var(--white)' }}
      >
        <div className="logo-content">
          {(job.logo && (
            <>
              {!preview && (
                <Image
                  alt={job.companyName}
                  height={64}
                  objectFit="contain"
                  src={job.logo}
                  width={64}
                />
              )}
              {preview && <img alt="" src={job.logo} />}
            </>
          )) || <p>{job.logoText}</p>}
        </div>
        <div className="job-content">
          <p>{job.companyName}</p>
          <h3>
            <Link href="/" style={{ color: dark ? '#fff' : 'var(--black)' }}>
              {job.title}
            </Link>
          </h3>
          <CategoryList dark={dark} items={[job.location, job.contract]} />
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
          {job.contract} - {codeToLabel[job.contract]}
        </p>
        {job.salary && (
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}>Salaire : {job.salary}</p>
        )}
        {job.companyLink && (
          <p>
            <Link blank href={job.companyLink}>
              {job.companyName}
            </Link>
          </p>
        )}
        <div className="action">
          <Link blank className="btn" href={job.source || 'mailto:' + job.sourceEmail}>
            Soumettre votre candidature
          </Link>
        </div>
      </div>

      <style jsx>{`
        details {
          border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          margin-bottom: 1em;
        }
        summary {
          align-items: center;
          padding: 0.5em;
          cursor: pointer;
        }
        summary.dark {
          color: #fff;
        }
        .content {
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          padding: 1.5em 0.5em 2em;
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
          background: #fff;
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
  preview: PropTypes.bool,
};
