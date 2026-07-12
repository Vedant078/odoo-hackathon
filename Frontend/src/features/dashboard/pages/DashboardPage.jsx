import React from 'react';
import KPIGrid from '../../../components/charts/KPIGrid';
import UtilizationChart from '../../../components/charts/UtilizationChart';
import BookingHeatmap from '../../../components/charts/BookingHeatmap';
import MaintenanceChart from '../../../components/charts/MaintenanceChart';
import { 
  MOCK_KPIS, 
  MOCK_UTILIZATION_DATA, 
  MOCK_HEATMAP_DATA, 
  MOCK_MAINTENANCE 
} from '../../../utils/mockData';

export const DashboardPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1 style={styles.title}>System Overview</h1>
        <p style={styles.subtitle}>Real-time status updates and operational metrics.</p>
      </div>

      {/* Numerical KPI indicators */}
      <KPIGrid kpis={MOCK_KPIS} />

      {/* Visual Analytics */}
      <div style={styles.chartGrid}>
        <div style={styles.wideChart}>
          <UtilizationChart data={MOCK_UTILIZATION_DATA} />
        </div>
        <div style={styles.narrowChart}>
          <BookingHeatmap data={MOCK_HEATMAP_DATA} />
        </div>
        <div style={styles.narrowChart}>
          <MaintenanceChart data={MOCK_MAINTENANCE} />
        </div>
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
  welcome: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  chartGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '24px',
  },
  wideChart: {
    gridColumn: 'span 2',
  },
  narrowChart: {
    gridColumn: 'span 1',
    '@media (max-width: 1024px)': {
      gridColumn: 'span 2',
    },
  },
};

export default DashboardPage;
