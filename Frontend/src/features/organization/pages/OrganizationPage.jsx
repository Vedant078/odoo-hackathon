import React from 'react';
import Card from '../../../components/common/Card';
import Table from '../../../components/common/Table';

export const OrganizationPage = () => {
  const departments = [
    { name: "Robotics & Drone Systems", head: "Alice Vance", members: 14, location: "Hangar 1" },
    { name: "Thermal Analysis & Calibrations", head: "Sarah Connor", members: 8, location: "Lab B" },
    { name: "Information Technology Devops", head: "Bob Smith", members: 22, location: "Server Room" },
  ];

  const columns = [
    { key: "name", header: "Department", render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { key: "head", header: "Department Head" },
    { key: "members", header: "Active Engineers" },
    { key: "location", header: "Workspace Facility" }
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionHeader}>Division Substructures</h2>
      <Table
        columns={columns}
        data={departments}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  sectionHeader: {
    fontSize: '18px',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '8px',
  },
};

export default OrganizationPage;
