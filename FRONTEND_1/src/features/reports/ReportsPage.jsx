import React from 'react';
import { FileText, Download, TrendingUp } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export const ReportsPage = () => {
  const reportsList = [
    { name: "Q2 Utilization Audit", date: "2026-06-30", type: "PDF", size: "1.2 MB" },
    { name: "Maintenance Expenditure Statement", date: "2026-07-05", type: "CSV", size: "244 KB" },
    { name: "Asset Depreciation Estimate", date: "2026-07-10", type: "XLSX", size: "850 KB" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.titleSection}>
        <div style={styles.titleIcon}>
          <FileText size={24} />
        </div>
        <div>
          <h1 style={styles.title}>Analytical Reports</h1>
          <p style={styles.subtitle}>Download operational graphs and machine cost balance sheets.</p>
        </div>
      </div>

      <div style={styles.grid}>
        {reportsList.map((r, idx) => (
          <Card key={idx} title={r.name} subtitle={`Generated on ${r.date}`} style={styles.card}>
            <div style={styles.metaRow}>
              <span style={styles.metaLabel}>Format: {r.type}</span>
              <span style={styles.metaLabel}>Size: {r.size}</span>
            </div>
            <div style={{ marginTop: '16px' }}>
              <Button variant="outline" size="sm" icon={<Download size={14} />} style={{ width: '100%' }}>
                Export
              </Button>
            </div>
          </Card>
        ))}
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
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid var(--border-color)',
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
};

export default ReportsPage;
