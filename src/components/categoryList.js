import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { codeToLabel } from '@lib/constants';
import styles from '@styles/categoryList.module.css';

export default function CategoryList({ dark, items }) {
  return (
    <div className={`flex ${styles.cat} ${dark ? styles.dark : ''}`}>
      {items.map((item, index) => (
        <Fragment key={index}>{item && <span title={codeToLabel[item]}>{item}</span>}</Fragment>
      ))}
    </div>
  );
}

CategoryList.propTypes = {
  dark: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string.isRequired),
};
