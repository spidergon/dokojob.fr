import PropTypes from 'prop-types';
import styles from '@styles/jobSkeleton.module.css';

export default function JobSkeleton({ nb = 1 }) {
  return (
    <>
      {[...Array(nb).keys()].map((i) => (
        <div key={i} className={`flex ${styles.skel}`}>
          <div className={styles.logo}></div>
          <div className={styles.content}>
            <div className={styles.company}></div>
            <div className={styles.title}></div>
            <div className={styles.loc}></div>
            <div className={styles.type}></div>
          </div>
        </div>
      ))}
    </>
  );
}

JobSkeleton.propTypes = { nb: PropTypes.number };
