import PropTypes from 'prop-types';

export default function CheckBox({ id, checked, action, title }) {
  return (
    <label htmlFor={id} title={title}>
      <input
        checked={checked}
        id={id}
        type="checkbox"
        onChange={({ target }) => action(id, target.checked)}
      />
      {id}

      <style jsx>{`
        label {
          display: inline-flex;
          margin-right: 1em;
        }
        input {
          margin-right: 0.5em;
        }
        label,
        input {
          cursor: pointer;
        }
      `}</style>
    </label>
  );
}

CheckBox.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  title: PropTypes.string,
};
