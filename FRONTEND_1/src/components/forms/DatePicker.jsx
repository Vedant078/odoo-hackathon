import React from 'react';
import { Calendar } from 'lucide-react';

export const DatePicker = ({
  label,
  value,
  onChange,
  error,
  required = false,
  min,
  max,
  style = {},
}) => {
  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={{ color: 'var(--color-danger)' }}>*</span>}
        </label>
      )}

      <div style={styles.inputContainer}>
        <span style={styles.icon}>
          <Calendar size={18} />
        </span>
        <input
          type="date"
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          style={{
            ...styles.input,
            borderColor: error ? 'var(--color-danger)' : 'var(--border-color)',
          }}
          required={required}
        />
      </div>

      {error && <span style={styles.errorText}>{error}</span>}
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
    transition: 'border-color var(--transition-fast)',
    paddingLeft: '38px',
    paddingRight: '14px',
    cursor: 'pointer',
  },
  errorText: {
    fontSize: '12px',
    color: 'var(--color-danger)',
    fontWeight: 500,
  },
};

export default DatePicker;
