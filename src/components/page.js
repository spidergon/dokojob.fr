import PropTypes from 'prop-types';
import styles from '@styles/layout.module.css';

export default function Page({ children }) {
  return <div className={`container ${styles.page}`}>{children}</div>;
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
