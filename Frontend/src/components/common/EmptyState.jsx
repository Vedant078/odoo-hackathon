import React from 'react';
import { Database } from 'lucide-react';

export const EmptyState = ({
  message = "No data available",
  icon = <Database size={40} />,
  action,
}) => {
  return (
    <div style={styles.container} className="animate-fade-in">
      <div style={styles.iconContainer}>
        {icon}
      </div>
      <p style={styles.text}>{message}</p>
      {action && (
        <div style={styles.actionContainer}>
          {action}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    textAlign: 'center',
    color: 'var(--text-secondary)',
  },
  iconContainer: {
    color: 'var(--text-muted)',
    marginBottom: '16px',
    backgroundColor: 'var(--surface-color)',
    padding: '16px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '14px',
    fontWeight: 500,
    maxWidth: '300px',
  },
  actionContainer: {
    marginTop: '20px',
  },
};

export default EmptyState;
