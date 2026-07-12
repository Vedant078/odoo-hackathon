import React from 'react';

export const Input = ({
  label,
  error,
  helperText,
  icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  style = {},
  ...props
}) => {
  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}
      
      <div style={styles.inputContainer}>
        {icon && <span style={styles.icon}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            ...styles.input,
            paddingLeft: icon ? '38px' : '14px',
            borderColor: error ? 'var(--color-danger)' : 'var(--border-color)',
          }}
          required={required}
          {...props}
        />
      </div>

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
  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    position: 'absolute',
    left: '12px',
    color: 'var(--text-muted)',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    height: '42px',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
    paddingRight: '14px',
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

export default Input;
