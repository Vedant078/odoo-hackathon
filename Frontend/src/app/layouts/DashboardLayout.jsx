import React, { useState, useContext } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../providers/ThemeProvider';
import { ROUTES } from '../../utils/routes';
import { 
  LayoutDashboard, Boxes, GitCommit, CalendarRange, Wrench, 
  ShieldAlert, FilePieChart, Bell, LogOut, Sun, Moon, Menu, X, Shield 
} from 'lucide-react';

export const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { name: "Dashboard", path: ROUTES.DASHBOARD, icon: <LayoutDashboard size={20} /> },
    { name: "Assets", path: ROUTES.ASSETS, icon: <Boxes size={20} /> },
    { name: "Allocation", path: ROUTES.ALLOCATION, icon: <GitCommit size={20} /> },
    { name: "Bookings", path: ROUTES.BOOKINGS, icon: <CalendarRange size={20} /> },
    { name: "Maintenance", path: ROUTES.MAINTENANCE, icon: <Wrench size={20} /> },
    { name: "Audits", path: ROUTES.AUDITS, icon: <ShieldAlert size={20} /> },
    { name: "Reports", path: ROUTES.REPORTS, icon: <FilePieChart size={20} /> },
    { name: "Notifications", path: ROUTES.NOTIFICATIONS, icon: <Bell size={20} /> },
  ];

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  return (
    <div style={styles.appContainer}>
      {/* Sidebar */}
      <aside style={{ ...styles.sidebar, width: sidebarOpen ? '260px' : '70px' }}>
        <div style={styles.sidebarHeader}>
          {sidebarOpen && <span style={styles.logoText}>Antigravity Ops</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={styles.toggleBtn}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav style={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                ...styles.navLink,
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
              })}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </NavLink>
          ))}

          {isAdmin && (
            <NavLink
              to={ROUTES.ADMIN}
              style={({ isActive }) => ({
                ...styles.navLink,
                justifyContent: sidebarOpen ? 'flex-start' : 'center',
                backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
                marginTop: '16px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '16px',
              })}
            >
              <span style={styles.navIcon}><Shield size={20} /></span>
              {sidebarOpen && <span>Admin Panel</span>}
            </NavLink>
          )}
        </nav>

        <div style={styles.sidebarFooter}>
          <button onClick={toggleTheme} style={styles.footerAction}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {sidebarOpen && <span style={{ marginLeft: '12px' }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          <button onClick={handleLogout} style={{ ...styles.footerAction, color: 'var(--color-danger)' }}>
            <LogOut size={20} />
            {sidebarOpen && <span style={{ marginLeft: '12px' }}>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <div style={styles.mainWrapper}>
        <header style={styles.header}>
          <div style={styles.headerTitle}>
            <h2>Operational Workspace</h2>
          </div>
          <div style={styles.userInfo}>
            <div style={styles.avatar}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={styles.userMeta}>
              <span style={styles.userName}>{user?.name || 'User'}</span>
              <span style={styles.userRole}>{user?.role?.toUpperCase()}</span>
            </div>
          </div>
        </header>

        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const styles = {
  appContainer: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
    backgroundColor: 'var(--surface-color)',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: 'var(--card-color)',
    borderRight: '1px solid var(--border-color)',
    transition: 'width var(--transition-normal)',
    overflowX: 'hidden',
  },
  sidebarHeader: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    borderBottom: '1px solid var(--border-color)',
  },
  logoText: {
    fontFamily: 'var(--font-display)',
    fontWeight: '800',
    fontSize: '18px',
    color: 'var(--color-primary)',
    whiteSpace: 'nowrap',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--text-secondary)',
    padding: '6px',
    borderRadius: 'var(--radius-sm)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nav: {
    flexGrow: 1,
    padding: '20px 10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 14px',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'all var(--transition-fast)',
  },
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '12px',
  },
  sidebarFooter: {
    padding: '16px 10px',
    borderTop: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  footerAction: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 14px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    borderRadius: 'var(--radius-sm)',
    fontSize: '14px',
    fontWeight: 500,
    color: 'var(--text-secondary)',
    transition: 'background var(--transition-fast)',
    textAlign: 'left',
  },
  mainWrapper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
  },
  header: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 32px',
    backgroundColor: 'var(--card-color)',
    borderBottom: '1px solid var(--border-color)',
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: 'var(--radius-full)',
    backgroundColor: 'var(--color-primary-light)',
    color: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '16px',
    border: '1px solid var(--color-primary)',
  },
  userMeta: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--text-primary)',
  },
  userRole: {
    fontSize: '11px',
    color: 'var(--text-muted)',
    fontWeight: 700,
  },
  content: {
    flexGrow: 1,
    padding: '32px',
    overflowY: 'auto',
    backgroundColor: 'var(--surface-color)',
  },
};

export default DashboardLayout;
