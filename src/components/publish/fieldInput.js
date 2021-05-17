import PropTypes from 'prop-types';
import { codeToLabel } from '@utils/constant';

export default function FieldInput({
  autoFocus,
  id,
  helperText,
  label,
  minLength,
  pattern,
  placeholder,
  onChange,
  options,
  required,
  type,
  value,
}) {
  const handleOnChange = ({ target }) => {
    onChange(target.id, target.value);
  };

  return (
    <div className="field flex">
      <label htmlFor={id}>
        {label}
        {required ? '*' : ''}
      </label>
      {(type === 'select' && (
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
        />
      )}
      {helperText && <span>{helperText}</span>}
      <style jsx>{`
        .field {
          flex-direction: column;
          gap: 0.5em;
          width: 100%;
        }
        label {
          text-transform: uppercase;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.7px;
        }
        input[type='text'],
        select {
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 7px;
        }
        select {
          appearance: none;
          background: #fff;
        }
        span {
          font-size: 14px;
          line-height: 1.66;
          letter-spacing: 0.03em;
          color: rgba(0, 0, 0, 0.54);
        }
      `}</style>
    </div>
  );
}

FieldInput.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string.isRequired,
  helperText: PropTypes.string,
  label: PropTypes.string.isRequired,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
};
