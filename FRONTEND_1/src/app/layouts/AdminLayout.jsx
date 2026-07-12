import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Shield, Users, Settings, Building } from 'lucide-react';
import { ROUTES } from '../../utils/routes';

export const AdminLayout = () => {
  return (
    <div style={styles.container}>
      <div style={styles.titleSection}>
        <div style={styles.titleIcon}>
          <Shield size={24} />
        </div>
        <div>
          <h1 style={styles.title}>System Administration</h1>
          <p style={styles.subtitle}>Configure organization metadata, permissions, and settings.</p>
        </div>
      </div>

      {/* Admin Sub Navigation Tabs */}
      <div style={styles.tabContainer}>
        <NavLink
          to={ROUTES.ADMIN}
          end
          style={({ isActive }) => ({
            ...styles.tabLink,
            borderColor: isActive ? 'var(--color-primary)' : 'transparent',
            color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
          })}
        >
          <Building size={16} style={{ marginRight: '8px' }} />
          Organization
        </NavLink>
        
        <NavLink
          to={ROUTES.ADMIN_SETTINGS}
          style={({ isActive }) => ({
            ...styles.tabLink,
            borderColor: isActive ? 'var(--color-primary)' : 'transparent',
            color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
          })}
        >
          <Settings size={16} style={{ marginRight: '8px' }} />
          Settings
        </NavLink>
      </div>

      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    animation: 'fadeIn var(--transition-normal) ease-out',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  titleIcon: {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    gap: '8px',
  },
  tabLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 500,
    borderBottom: '2px solid transparent',
    transition: 'all var(--transition-fast)',
    cursor: 'pointer',
  },
  content: {
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    border: '1px solid var(--border-color)',
    minHeight: '400px',
  },
};

export default AdminLayout;
