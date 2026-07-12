import React, { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Calibration Overdue", desc: "Precision Spectrum Analyzer SN-77823-C calibration interval lapsed.", time: "2 hours ago", unread: true },
    { id: 2, title: "Allocation Approved", desc: "Heavy Duty Thermal Chamber allocated to Thermal Squad successfully.", time: "Yesterday", unread: false },
    { id: 3, title: "Sensor Alert", desc: "Supercomputing Node 42 heat core exceeded 80°C limit during task execution.", time: "3 days ago", unread: false },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <div style={styles.titleIcon}>
            <Bell size={24} />
          </div>
          <div>
            <h1 style={styles.title}>System Alerts</h1>
            <p style={styles.subtitle}>Critical sensor readings and resource reservation signals.</p>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button variant="secondary" size="sm" onClick={markAllRead} icon={<CheckCheck size={14} />}>
              Mark all read
            </Button>
            <Button variant="outline" size="sm" onClick={clearAll} icon={<Trash2 size={14} />} style={{ color: 'var(--color-danger)', borderColor: 'var(--color-danger)' }}>
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div style={styles.list}>
        {notifications.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            No active notification alerts.
          </Card>
        ) : (
          notifications.map((n) => (
            <Card 
              key={n.id} 
              style={{
                ...styles.item,
                borderLeft: n.unread ? '4px solid var(--color-primary)' : '1px solid var(--border-color)'
              }}
            >
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>{n.title}</h4>
                <span style={styles.time}>{n.time}</span>
              </div>
              <p style={styles.desc}>{n.desc}</p>
            </Card>
          ))
        )}
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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  item: {
    padding: '16px 20px',
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '6px',
  },
  itemTitle: {
    fontSize: '15px',
    fontWeight: 600,
  },
  time: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
  desc: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
};

export default NotificationsPage;
