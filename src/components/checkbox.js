import PropTypes from 'prop-types';

export default function CheckBox({ action, checked, id, children, onChange, title, ...other }) {
  let onChangeHandler;

  if (onChange) {
    onChangeHandler = onChange;
  } else if (action) {
    onChangeHandler = ({ target }) => action(id, target.checked);
  }

  return (
    <label htmlFor={id} title={title}>
      <input checked={checked} id={id} type="checkbox" onChange={onChangeHandler} {...other} />
      {children || id}

      <style jsx>{`
        label {
          display: inline-flex;
          align-items: center;
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
  action: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  title: PropTypes.string,
};
