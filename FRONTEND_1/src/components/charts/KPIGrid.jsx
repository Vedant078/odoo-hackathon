import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../common/Card';

export const KPIGrid = ({ kpis = [] }) => {
  return (
    <div style={styles.grid}>
      {kpis.map((kpi, idx) => {
        const isUp = kpi.trend === 'up';
        return (
          <Card key={idx} style={styles.card}>
            <div style={styles.content}>
              <span style={styles.title}>{kpi.title}</span>
              <h2 style={styles.value}>{kpi.value}</h2>
              
              <div style={styles.footer}>
                <span style={{
                  ...styles.badge,
                  color: isUp ? 'var(--color-success)' : 'var(--color-danger)',
                  backgroundColor: isUp ? 'var(--color-success-light)' : 'var(--color-danger-light)',
                }}>
                  {isUp ? <ArrowUpRight size={14} style={{ marginRight: '2px' }} /> : <ArrowDownRight size={14} style={{ marginRight: '2px' }} />}
                  {kpi.change}
                </span>
                <span style={styles.subtitle}>{kpi.subtitle}</span>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  card: {
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    letterSpacing: '-0.5px',
    margin: '4px 0',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '4px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
  },
  subtitle: {
    fontSize: '12px',
    color: 'var(--text-muted)',
  },
};

export default KPIGrid;
