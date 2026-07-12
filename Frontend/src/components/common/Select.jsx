import React from 'react';

export const Select = ({
  label,
  options = [], // [{ value, label }]
  value,
  onChange,
  error,
  helperText,
  required = false,
  style = {},
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}

      <select
        value={value}
        onChange={onChange}
        style={{
          ...styles.select,
          borderColor: error ? 'var(--color-danger)' : 'var(--border-color)',
        }}
        required={required}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error ? (
        <span style={styles.errorText}>{error}</span>
      ) : helperText ? (
        <span style={styles.helperText}>{helperText}</span>
      ) : null}
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
  },
  select: {
    width: '100%',
    height: '42px',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color var(--transition-fast)',
    padding: '0 12px',
    cursor: 'pointer',
  },
  errorText: {
    fontSize: '12px',
    color: 'var(--color-danger)',
    fontWeight: 500,
  },
  helperText: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
};

export default Select;
