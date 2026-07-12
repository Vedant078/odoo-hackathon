import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // primary | secondary | danger | outline | text
  size = 'md', // sm | md | lg
  disabled = false,
  loading = false,
  icon,
  style = {},
  ...props
}) => {
  const getStyles = () => {
    let base = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      borderRadius: 'var(--radius-sm)',
      border: '1px solid transparent',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'all var(--transition-fast)',
      outline: 'none',
      gap: '8px',
      ...style,
    };

    // Size styles
    const sizes = {
      sm: { padding: '6px 12px', fontSize: '12px' },
      md: { padding: '10px 18px', fontSize: '14px' },
      lg: { padding: '14px 24px', fontSize: '16px' },
    };

    // Variant styles
    const variants = {
      primary: {
        backgroundColor: 'var(--color-primary)',
        color: '#ffffff',
      },
      secondary: {
        backgroundColor: 'var(--surface-color)',
        color: 'var(--text-primary)',
        borderColor: 'var(--border-color)',
      },
      danger: {
        backgroundColor: 'var(--color-danger)',
        color: '#ffffff',
      },
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
      },
      text: {
        backgroundColor: 'transparent',
        color: 'var(--text-secondary)',
      },
    };

    return { ...base, ...sizes[size], ...variants[variant] };
  };

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={getStyles()}
      className="btn-custom"
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin-slow" />
      ) : icon ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      ) : null}
      {children}
    </button>
  );
};

export default Button;
