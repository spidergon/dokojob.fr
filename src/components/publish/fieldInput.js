import PropTypes from 'prop-types';
import { codeToLabel } from '@lib/constant';

export default function FieldInput({
  autoFocus,
  children,
  id,
  helperText,
  label,
  style,
  minLength,
  pattern,
  placeholder,
  onChange,
  onFocus,
  options,
  required,
  type,
  value,
}) {
  const handleOnChange = ({ target }) => {
    if (onChange) onChange(target.id, target.value);
  };

  return (
    <div className="field flex" style={style}>
      <label htmlFor={id}>
        {label}
        {required ? '*' : ''}
      </label>
      {(!children &&
        ((type === 'select' && (
          <select id={id} value={value} onChange={handleOnChange}>
            {options.map((val, index) => {
              const v = codeToLabel[val];

              return (
                <option key={index} value={val}>
                  {val}
                  {v && val !== v ? ` - ${v}` : ''}
                </option>
              );
            })}
          </select>
        )) || (
          <input
            autoFocus={autoFocus}
            id={id}
            minLength={minLength}
            pattern={pattern}
            placeholder={placeholder || label}
            required={required}
            type={type || 'text'}
            value={value}
            onChange={handleOnChange}
            onFocus={onFocus}
          />
        ))) ||
        children}

      {helperText && <span className="helperText">{helperText}</span>}

      <style jsx>{`
        .field {
          flex-direction: column;
          gap: 0.5em;
          width: 100%;
          margin-top: 2em;
        }
        label {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
        }
        input,
        select {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 7px;
        }
        select {
          appearance: none;
          background: #fff;
        }
      `}</style>
    </div>
  );
}

FieldInput.propTypes = {
  autoFocus: PropTypes.bool,
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  options: PropTypes.array,
  required: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.string,
  value: PropTypes.string,
};
