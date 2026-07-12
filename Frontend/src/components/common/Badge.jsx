import React from 'react';

export const Badge = ({
  children,
  variant = 'info', // primary | success | warning | danger | info | neutral
  style = {},
}) => {
  const getStyles = () => {
    const base = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '4px 8px',
      borderRadius: 'var(--radius-full)',
      fontSize: '11px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      ...style,
    };

    const variants = {
      primary: {
        backgroundColor: 'var(--color-primary-light)',
        color: 'var(--color-primary)',
      },
      success: {
        backgroundColor: 'var(--color-success-light)',
        color: 'var(--color-success)',
      },
      warning: {
        backgroundColor: 'var(--color-warning-light)',
        color: 'var(--color-warning)',
      },
      danger: {
        backgroundColor: 'var(--color-danger-light)',
        color: 'var(--color-danger)',
      },
      info: {
        backgroundColor: 'var(--color-info-light)',
        color: 'var(--color-info)',
      },
      neutral: {
        backgroundColor: 'var(--surface-color)',
        color: 'var(--text-secondary)',
        border: '1px solid var(--border-color)',
      },
    };

    return { ...base, ...variants[variant] };
  };

  return (
    <span style={getStyles()}>
      {children}
    </span>
  );
};

export default Badge;
