import React from 'react';
import Modal from './Modal';
import Button from './Button';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger", // danger | primary
  loading = false,
}) => {
  const footer = (
    <>
      <Button variant="secondary" onClick={onClose} disabled={loading}>
        {cancelText}
      </Button>
      <Button variant={variant} onClick={onConfirm} loading={loading}>
        {confirmText}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth="440px"
    >
      <div style={styles.content}>
        <div style={{
          ...styles.iconWrapper,
          color: variant === 'danger' ? 'var(--color-danger)' : 'var(--color-primary)',
          backgroundColor: variant === 'danger' ? 'var(--color-danger-light)' : 'var(--color-primary-light)',
        }}>
          <AlertTriangle size={24} />
        </div>
        <div style={styles.textWrapper}>
          <p style={styles.message}>{message}</p>
        </div>
      </div>
    </Modal>
  );
};

const styles = {
  content: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  textWrapper: {
    flexGrow: 1,
  },
  message: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  },
};

export default ConfirmDialog;
