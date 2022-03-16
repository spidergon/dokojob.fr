import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { codeToLabel } from '@lib/constants';

export default function CategoryList({ dark, items }) {
  return (
    <div className={`flex${dark ? ' dark' : ''}`}>
      {items.map((item, index) => (
        <Fragment key={index}>{item && <span title={codeToLabel[item]}>{item}</span>}</Fragment>
      ))}

      <style jsx>{`
        span {
          font-size: 0.85rem;
          margin: 0.5em;
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 16px;
          padding: 0 10px;
        }
        span:first-of-type {
          margin-left: 0;
        }
        .dark span {
          border-color: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}

CategoryList.propTypes = {
  dark: PropTypes.bool,
  items: PropTypes.arrayOf(PropTypes.string.isRequired),
};
