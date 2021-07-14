import PropTypes from 'prop-types';

export default function CheckBox({
  action,
  checked,
  children,
  disabled,
  id,
  onChange,
  title,
  ...other
}) {
  let onChangeHandler;

  if (onChange) {
    onChangeHandler = onChange;
  } else if (action) {
    onChangeHandler = ({ target }) => action(id, target.checked);
  }

  return (
    <label className={disabled ? 'disabled' : ''} htmlFor={id} title={title}>
      <input
        checked={checked}
        disabled={disabled}
        id={id}
        type="checkbox"
        onChange={onChangeHandler}
        {...other}
      />
      {children || id}

      <style jsx>{`
        label {
          display: inline-flex;
          align-items: center;
          margin-right: 1em;
        }
        label.disabled {
          color: gray;
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
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  title: PropTypes.string,
};
