import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/routes';
import { APP_NAME } from '../../utils/constants';

export const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // If already logged in, redirect straight to dashboard
  if (isAuthenticated) {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.card} className="glass-panel animate-fade-in">
        <div style={styles.header}>
          <h1 style={styles.title}>{APP_NAME}</h1>
          <p style={styles.subtitle}>Asset Control & Operations Center</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '24px',
    backgroundColor: 'var(--surface-color)',
    transition: 'background-color var(--transition-normal)',
  },
  card: {
    maxWidth: '440px',
    width: '100%',
    borderRadius: 'var(--radius-lg)',
    padding: '40px',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-color)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--color-primary)',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    marginTop: '6px',
  },
};

export default AuthLayout;
