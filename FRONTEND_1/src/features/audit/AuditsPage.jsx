import React from 'react';
import { ShieldCheck, Calendar, Activity } from 'lucide-react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';

export const AuditsPage = () => {
  const auditLogs = [
    { id: "aud-901", timestamp: "2026-07-12 09:12:00", user: "Sarah Connor", action: "Calibrated Thermal Chamber cooling coil", status: "PASSED" },
    { id: "aud-902", timestamp: "2026-07-11 14:32:00", user: "System Daemon", action: "Scheduled calibration check on spectrum analyzer", status: "COMPLIANT" },
    { id: "aud-903", timestamp: "2026-07-10 18:05:00", user: "John Doe", action: "Requested drone allocation extend to 12 days", status: "WARNING" },
  ];

  const columns = [
    { key: "timestamp", header: "Timestamp", render: (r) => <span style={{ fontFamily: 'monospace' }}>{r.timestamp}</span> },
    { key: "user", header: "Initiator", render: (r) => <span style={{ fontWeight: 600 }}>{r.user}</span> },
    { key: "action", header: "Operational Event Log" },
    {
      key: "status",
      header: "Status",
      render: (r) => (
        <Badge variant={r.status === 'WARNING' ? 'warning' : 'success'}>
          {r.status}
        </Badge>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.titleSection}>
        <div style={styles.titleIcon}>
          <ShieldCheck size={24} />
        </div>
        <div>
          <h1 style={styles.title}>System Audits & Compliance</h1>
          <p style={styles.subtitle}>Audit trail tracking configuration overrides and calibration schedules.</p>
        </div>
      </div>

      <Table
        columns={columns}
        data={auditLogs}
      />
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
};

export default AuditsPage;
