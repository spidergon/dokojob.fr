import PropTypes from 'prop-types';

export default function Page({ children }) {
  return (
    <div className="container page">
      {children}
      <style global jsx>{`
        .page {
          margin-top: 2em;
          padding: 0 1em;
        }
        .page h1 {
          font-size: 2rem;
        }
        .page h2 {
          font-size: 1.25rem;
          margin-top: 2em;
        }
        .page p {
          margin: 1em 0 0.5em;
        }
        .page ul {
          margin: 1em 0;
          padding-left: 2.5em;
        }
      `}</style>
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
};
