import React from 'react';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import { Network, ArrowUpRight } from 'lucide-react';

export const AllocationPage = () => {
  const mockAllocations = [
    { id: "alc-301", team: "Flight Systems team", asset: "Autonomous Delivery Drone", lead: "Alice Vance", duration: "12 Days", priority: "HIGH" },
    { id: "alc-302", team: "Thermal Engineering Team", asset: "Heavy Duty Thermal Chamber", lead: "Sarah Connor", duration: "3 Days", priority: "CRITICAL" },
    { id: "alc-303", team: "IT Infrastructure Team", asset: "Supercomputing Node 42", lead: "Bob Smith", duration: "Ongoing", priority: "MEDIUM" },
  ];

  const columns = [
    { key: "id", header: "Allocation ID" },
    { key: "team", header: "Assigned Team", render: (r) => <span style={{ fontWeight: 600 }}>{r.team}</span> },
    { key: "asset", header: "Assigned Asset" },
    { key: "lead", header: "Team Lead" },
    { key: "duration", header: "Duration Limit" },
    { 
      key: "priority", 
      header: "Severity",
      render: (r) => (
        <Badge variant={r.priority === 'CRITICAL' ? 'danger' : r.priority === 'HIGH' ? 'warning' : 'info'}>
          {r.priority}
        </Badge>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.titleSection}>
        <div style={styles.titleIcon}>
          <Network size={24} />
        </div>
        <div>
          <h1 style={styles.title}>Asset Allocations</h1>
          <p style={styles.subtitle}>Map and authorize organizational equipment allocations to engineering squads.</p>
        </div>
      </div>

      <Table
        columns={columns}
        data={mockAllocations}
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

export default AllocationPage;
