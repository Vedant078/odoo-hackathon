import React from 'react';

export const FormField = ({
  label,
  error,
  required = false,
  children,
  style = {},
}) => {
  return (
    <div style={{ ...styles.wrapper, ...style }}>
      {label && (
        <label style={styles.label}>
          {label} {required && <span style={styles.required}>*</span>}
        </label>
      )}
      
      <div style={styles.fieldContainer}>
        {children}
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
  required: {
    color: 'var(--color-danger)',
  },
  fieldContainer: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  },
  errorText: {
    fontSize: '12px',
    color: 'var(--color-danger)',
    fontWeight: 500,
    marginTop: '2px',
  },
};

export default FormField;
