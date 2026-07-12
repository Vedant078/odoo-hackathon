import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  headerActions,
  footer,
  hoverable = false,
  style = {},
  bodyStyle = {},
}) => {
  return (
    <div 
      style={{
        ...styles.card,
        ...(hoverable && styles.hoverable),
        ...style
      }}
      className={hoverable ? "card-hoverable" : ""}
    >
      {(title || subtitle || headerActions) && (
        <div style={styles.header}>
          <div style={styles.titleArea}>
            {title && <h3 style={styles.title}>{title}</h3>}
            {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
          </div>
          {headerActions && <div style={styles.actions}>{headerActions}</div>}
        </div>
      )}

      <div style={{ ...styles.body, ...bodyStyle }}>
        {children}
      </div>

      {footer && (
        <div style={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
  },
  hoverable: {
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: 'var(--shadow-md)',
      borderColor: 'var(--border-color-hover)',
    }
  },
  header: {
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '16px',
  },
  titleArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '700',
    color: 'var(--text-primary)',
  },
  subtitle: {
    fontSize: '13px',
    color: 'var(--text-muted)',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  body: {
    padding: '24px',
    flexGrow: 1,
  },
  footer: {
    padding: '16px 24px',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};

export default Card;
