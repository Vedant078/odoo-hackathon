import React from 'react';
import { Loader2 } from 'lucide-react';

export const Loader = ({ text = "Loading...", size = 32, style = {} }) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      <Loader2 size={size} style={styles.spinner} className="animate-spin-slow" />
      {text && <span style={styles.text}>{text}</span>}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '24px',
  },
  spinner: {
    color: 'var(--color-primary)',
  },
  text: {
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
  },
};

export default Loader;
