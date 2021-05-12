import React from 'react';
import PropTypes from 'prop-types';
import { codeToLabel } from '@utils/constant';

export default function CategoryList({ items }) {
  return (
    <div className="wrapper flex">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item && <span title={codeToLabel[item]}>{item}</span>}
        </React.Fragment>
      ))}
      <style jsx>{`
        .wrapper > * {
          font-size: 0.85rem;
          margin: 0.5em;
          border: 1px solid rgba(0, 0, 0, 0.23);
          border-radius: 16px;
          padding: 0 10px;
        }
        .wrapper > :first-child {
          margin-left: 0;
        }
      `}</style>
    </div>
  );
}

CategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string.isRequired),
};
