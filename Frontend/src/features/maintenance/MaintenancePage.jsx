import React, { useState } from 'react';
import { Wrench, Plus, Check } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import { MOCK_MAINTENANCE } from '../../utils/mockData';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { MAINTENANCE_STATUS } from '../../utils/constants';

export const MaintenancePage = () => {
  const [maintenance, setMaintenance] = useState(MOCK_MAINTENANCE);
  const [search, setSearch] = useState('');

  const handleResolve = (id) => {
    setMaintenance(prev =>
      prev.map(m => m.id === id ? { ...m, status: MAINTENANCE_STATUS.COMPLETED } : m)
    );
  };

  const filteredMaint = maintenance.filter(m => 
    m.assetName.toLowerCase().includes(search.toLowerCase()) ||
    m.type.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", header: "Log ID" },
    { key: "assetName", header: "Equipment Name", render: (r) => <span style={{ fontWeight: 600 }}>{r.assetName}</span> },
    { key: "type", header: "Service Type" },
    { key: "date", header: "Scheduled Date", render: (r) => formatDate(r.date) },
    { key: "cost", header: "Cost", render: (r) => formatCurrency(r.cost) },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === MAINTENANCE_STATUS.COMPLETED) variant = 'success';
        if (r.status === MAINTENANCE_STATUS.IN_PROGRESS) variant = 'warning';
        if (r.status === MAINTENANCE_STATUS.OVERDUE) variant = 'danger';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    {
      key: "actions",
      header: "Operations",
      render: (r) => {
        if (r.status === MAINTENANCE_STATUS.COMPLETED) return <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Resolved</span>;
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

      <Table
        columns={columns}
        data={filteredMaint}
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
