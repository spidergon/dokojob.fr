import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div className="container page">
      {children}
      <style global jsx>{`
        .page {
          margin-top: 2em;
        }
        .page h1 {
          font-size: 20px;
        }
        .page p {
          margin: 1em 0 0.5em;
        }
      `}</style>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
