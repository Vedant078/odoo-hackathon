import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '420px',
}) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div 
        style={{ ...styles.drawer, width }} 
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={20} />
          </button>
        </div>

        <div style={styles.body}>
          {children}
        </div>

        {footer && (
          <div style={styles.footer}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 1100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  drawer: {
    height: '100%',
    backgroundColor: 'var(--card-color)',
    boxShadow: 'var(--shadow-lg)',
    borderLeft: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    animation: 'slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 24px',
    borderBottom: '1px solid var(--border-color)',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--text-primary)',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    padding: '4px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
  },
  body: {
    padding: '24px',
    overflowY: 'auto',
    flexGrow: 1,
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid var(--border-color)',
    backgroundColor: 'var(--surface-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
};

export default Drawer;
