import React, { createContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const showSuccess = useCallback((msg, dur) => addNotification(msg, 'success', dur), [addNotification]);
  const showWarning = useCallback((msg, dur) => addNotification(msg, 'warning', dur), [addNotification]);
  const showError = useCallback((msg, dur) => addNotification(msg, 'danger', dur), [addNotification]);
  const showInfo = useCallback((msg, dur) => addNotification(msg, 'info', dur), [addNotification]);

  return (
    <NotificationContext.Provider value={{ showSuccess, showWarning, showError, showInfo, removeNotification }}>
      {children}
      
      {/* Toast container overlay */}
      <div style={styles.container}>
        {notifications.map((n) => (
          <div key={n.id} style={{ ...styles.toast, ...styles[n.type] }} className="animate-fade-in">
            <span style={styles.iconContainer}>
              {n.type === 'success' && <CheckCircle size={18} />}
              {n.type === 'warning' && <AlertTriangle size={18} />}
              {n.type === 'danger' && <AlertCircle size={18} />}
              {n.type === 'info' && <Info size={18} />}
            </span>
            <div style={styles.message}>{n.message}</div>
            <button onClick={() => removeNotification(n.id)} style={styles.closeBtn}>
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 9999,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '380px',
    width: '100%',
  },
  toast: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 500,
    animation: 'slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1) forwards',
    backdropFilter: 'blur(8px)',
  },
  iconContainer: {
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  message: {
    flexGrow: 1,
    marginRight: '8px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.15s ease',
  },
  success: {
    backgroundColor: 'rgba(16, 185, 129, 0.95)',
    borderLeft: '4px solid #059669',
  },
  warning: {
    backgroundColor: 'rgba(245, 158, 11, 0.95)',
    borderLeft: '4px solid #d97706',
  },
  danger: {
    backgroundColor: 'rgba(239, 68, 68, 0.95)',
    borderLeft: '4px solid #dc2626',
  },
  info: {
    backgroundColor: 'rgba(79, 70, 229, 0.95)',
    borderLeft: '4px solid #4338ca',
  },
};
