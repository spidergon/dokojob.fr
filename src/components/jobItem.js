import { memo, useEffect, useState } from 'react';
import Image from "next/legacy/image";
import PropTypes from 'prop-types';
import CategoryList from '@components/categoryList';
import Link from '@components/link';
import { codeToLabel } from '@lib/constants';
import purify from '@lib/purify';
import styles from '@styles/jobItem.module.css';

const MyImage = memo(function MyComponent({ alt, src }) {
  return <Image alt={alt} height={64} objectFit="contain" src={src} width={64} />;
});

const MyContent = memo(function MyComponent({ description }) {
  return (
    <p
      dangerouslySetInnerHTML={{
        __html: purify(description.replace(/(?:\r\n|\r|\n)/g, '<br>')),
      }}
    />
  );
});

const shareLink = ({ slug, companyName, location, title }) =>
  `https://twitter.com/intent/tweet?url=https://dokojob.fr/job/${slug}&text=Nouvelle offre de ${companyName} (${location}) : ${title}`;

export default function JobItem({ job, open, preview }) {
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
    <details className={styles.details} open={open}>
      <summary
        className={`flex ${dark ? styles.dark : ''}`}
        style={{ background: job.color || 'var(--white)' }}
      >
        <div className={styles.logo_content}>
          {(job.logo && (
            <>
              {!preview && <MyImage alt={job.companyName} src={job.logo} />}
              {/* eslint-disable @next/next/no-img-element */}
              {preview && <img alt="" src={job.logo} />}
            </>
          )) || <p>{job.logoText}</p>}
        </div>
        <div className={styles.job_content}>
          <p>{job.companyName}</p>
          <h3 className="flex">
            {job.title}&nbsp;
            {!open && !preview && (
              <Link noprefetch href={`/job/${job.slug}`} title="Voir page">
                &#10132;
              </Link>
            )}
          </h3>
          <div className={`flex ${styles.cat_group}`}>
            <CategoryList dark={dark} items={[job.location, job.contract]} />
            {!preview && (
              <Link blank href={shareLink(job)} title="Partager sur Twitter">
                <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
            )}
          </div>
        </div>
        <div className="job-date">
          <p className="no-wrap">{job.createdAt}</p>
        </div>
      </summary>

      <div className={styles.content}>
        <MyContent description={job.description} />
        <div className={styles.separator} />
        <p style={{ fontSize: '14px', margin: '0.5rem 0' }}>
          {job.contract}
          {codeToLabel[job.contract] !== job.contract ? ` - ${codeToLabel[job.contract]}` : ''}
          {job.duration && job.contract !== 'CDI' ? ` - ${job.duration}` : ''}
        </p>
        {job.salary && (
          <p style={{ fontSize: '14px', marginBottom: '0.5rem' }}>Salaire : {job.salary}</p>
        )}
        {job.companyUrl && (
          <p>
            <Link blank href={job.companyUrl}>
              {job.companyName}
            </Link>
          </p>
        )}
        <div className={styles.links}>
          {!open && !preview && (
            <>
              <Link noprefetch href={`/job/${job.slug}`} title="Voir page détaillée">
                Voir plus
              </Link>
              {' | '}
            </>
          )}
          <Link blank href={!preview ? shareLink(job) : '#'} title="Partager sur Twitter">
            Partager
          </Link>
        </div>
        <div className={styles.action}>
          <Link
            blank
            className="btn"
            href={job.source || (job.sourceEmail ? 'mailto:' + job.sourceEmail : '#')}
          >
            POSTULER
          </Link>
        </div>
      </div>
    </details>
  );
}

JobItem.propTypes = {
  job: PropTypes.object.isRequired,
  open: PropTypes.bool,
  preview: PropTypes.bool,
};
