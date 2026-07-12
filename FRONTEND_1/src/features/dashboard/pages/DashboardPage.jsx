import React, { useState, useEffect } from 'react';
import UtilizationChart from '../../../components/charts/UtilizationChart';
import BookingHeatmap from '../../../components/charts/BookingHeatmap';
import MaintenanceChart from '../../../components/charts/MaintenanceChart';
import { getDashboardKPIs } from '../../../utils/api';
import { 
  MOCK_UTILIZATION_DATA, 
  MOCK_HEATMAP_DATA, 
  MOCK_MAINTENANCE 
} from '../../../utils/mockData';

export const DashboardPage = () => {
  const [metrics, setMetrics] = useState({
    active_vehicles: 53,
    available_vehicles: 42,
    vehicles_in_maintenance: 5,
    active_trips: 18,
    pending_trips: 9,
    drivers_on_duty: 26,
    fleet_utilization: 81
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchKPIs = async () => {
      try {
        const data = await getDashboardKPIs();
        if (isMounted) {
          setMetrics(data);
          setLoading(false);
        }
      } catch (err) {
        console.warn("Failed to fetch dashboard KPIs from backend, using fallbacks:", err);
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    fetchKPIs();
    return () => { isMounted = false; };
  }, []);

  const kpiData = [
    { title: "ACTIVE VEHICLES", value: String(metrics.active_vehicles).padStart(2, '0'), color: "#3b82f6" },
    { title: "AVAILABLE VEHICLES", value: String(metrics.available_vehicles).padStart(2, '0'), color: "#10b981" },
    { title: "VEHICLES IN MAINTENANCE", value: String(metrics.vehicles_in_maintenance).padStart(2, '0'), color: "#ea580c" },
    { title: "ACTIVE TRIPS", value: String(metrics.active_trips).padStart(2, '0'), color: "#3b82f6" },
    { title: "PENDING TRIPS", value: String(metrics.pending_trips).padStart(2, '0'), color: "#06b6d4" },
    { title: "DRIVERS ON DUTY", value: String(metrics.drivers_on_duty).padStart(2, '0'), color: "#3b82f6" },
    { title: "FLEET UTILIZATION", value: `${metrics.fleet_utilization}%`, color: "#10b981" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.welcome}>
        <h1 style={styles.title}>System Overview</h1>
        <p style={styles.subtitle}>Real-time status updates and operational metrics.</p>
      </div>

      {/* 7 Custom KPI cards */}
      <div style={styles.kpiRow}>
        {kpiData.map((kpi, idx) => (
          <div key={idx} style={{ ...styles.kpiCard, borderLeft: `4px solid ${kpi.color}` }}>
            <span style={styles.kpiTitle}>{kpi.title}</span>
            <h2 style={styles.kpiValue}>{kpi.value}</h2>
          </div>
        ))}
      </div>

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
  kpiRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
    gap: '12px',
    width: '100%',
    marginBottom: '8px',
  },
  kpiCard: {
    backgroundColor: 'var(--card-color)',
    border: '1px solid var(--border-color)',
    borderRadius: '4px',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '80px',
    boxShadow: 'var(--shadow-sm)',
    transition: 'all var(--transition-fast) ease',
  },
  kpiTitle: {
    fontSize: '9px',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    lineHeight: '1.2',
  },
  kpiValue: {
    fontSize: '28px',
    fontWeight: '800',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-display)',
    lineHeight: '1',
    marginTop: '6px',
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
