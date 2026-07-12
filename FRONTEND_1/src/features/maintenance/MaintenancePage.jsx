import React, { useState, useEffect } from 'react';
import { Wrench, Check } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import { formatCurrency, formatDate } from '../../utils/formatters';
import api, { getMaintenanceLogs, updateMaintenanceLog } from '../../utils/api';

export const MaintenancePage = () => {
  const [maintenance, setMaintenance] = useState([]);
  const [vehiclesMap, setVehiclesMap] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [logsData, vehiclesData] = await Promise.all([
        getMaintenanceLogs(),
        api.get('/vehicles').then(r => r.data)
      ]);

      const vMap = {};
      vehiclesData.forEach(v => { vMap[v.id] = v.vehicle_name; });
      setVehiclesMap(vMap);

      setMaintenance(logsData);
    } catch (err) {
      console.error("Failed to load maintenance logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleResolve = async (id) => {
    try {
      await updateMaintenanceLog(id, { 
        status: "Completed", 
        end_date: new Date().toISOString().split('T')[0] 
      });
      await loadData();
    } catch (err) {
      console.error("Failed to resolve maintenance log:", err);
    }
  };

  const filteredMaint = maintenance.filter(m => {
    const assetName = vehiclesMap[m.vehicle_id] || `Vehicle #${m.vehicle_id}`;
    const matchesAsset = assetName.toLowerCase().includes(search.toLowerCase());
    const matchesType = (m.maintenance_type || "").toLowerCase().includes(search.toLowerCase());
    const matchesDesc = (m.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesAsset || matchesType || matchesDesc;
  });

  const columns = [
    { key: "id", header: "Log ID", render: (r) => <span>LOG-{r.id}</span> },
    { key: "vehicle_id", header: "Equipment Name", render: (r) => <span style={{ fontWeight: 600 }}>{vehiclesMap[r.vehicle_id] || `Vehicle #${r.vehicle_id}`}</span> },
    { key: "maintenance_type", header: "Service Type" },
    { key: "start_date", header: "Scheduled Date", render: (r) => formatDate(r.start_date) },
    { key: "maintenance_cost", header: "Cost", render: (r) => formatCurrency(r.maintenance_cost) },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === "Completed") variant = 'success';
        if (r.status === "Active") variant = 'warning';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    {
      key: "actions",
      header: "Operations",
      render: (r) => {
        if (r.status === "Completed") return <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Resolved</span>;
        return (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleResolve(r.id)} 
            icon={<Check size={14} />}
            style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
          >
            Resolve
          </Button>
        );
      }
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <div style={styles.titleIcon}>
            <Wrench size={24} />
          </div>
          <div>
            <h1 style={styles.title}>Maintenance Logs</h1>
            <p style={styles.subtitle}>Track diagnostic repairs, sensor calibrations, and system overrides.</p>
          </div>
        </div>
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter logs by equipment or service type..."
        onClear={() => setSearch('')}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading maintenance logs...</div>
      ) : (
        <Table
          columns={columns}
          data={filteredMaint}
        />
      )}
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
};

export default MaintenancePage;
