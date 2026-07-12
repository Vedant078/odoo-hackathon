import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = '550px',
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
        style={{ ...styles.modal, maxWidth }} 
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in"
      >
        <div style={styles.header}>
          <h3 style={styles.title}>{title}</h3>
          <button onClick={onClose} style={styles.closeBtn}>
            <X size={18} />
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
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(6px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    width: '100%',
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 20px',
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
    transition: 'color var(--transition-fast)',
  },
  body: {
    padding: '20px',
    overflowY: 'auto',
    maxHeight: '70vh',
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  footer: {
    padding: '16px 20px',
    backgroundColor: 'var(--surface-color)',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
};

export default Modal;
