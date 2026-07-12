import React, { useState } from 'react';
import { Plus, Check, RefreshCw } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import Drawer from '../../components/common/Drawer';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { MOCK_ASSETS } from '../../utils/mockData';
import { ASSET_STATUS } from '../../utils/constants';

export const AssetsPage = () => {
  const [assets, setAssets] = useState(MOCK_ASSETS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  // New asset form inputs
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [serial, setSerial] = useState('');
  const [location, setLocation] = useState('');

  const statusOptions = [
    { value: ASSET_STATUS.AVAILABLE, label: "Available" },
    { value: ASSET_STATUS.IN_USE, label: "In Use" },
    { value: ASSET_STATUS.MAINTENANCE, label: "Maintenance" },
  ];

  const handleCreate = (e) => {
    e.preventDefault();
    if (!name || !category) return;

    const newAsset = {
      id: `ast-${Date.now().toString().slice(-3)}`,
      name,
      category,
      serial: serial || `SN-${Math.floor(10000 + Math.random() * 90000)}`,
      location: location || 'Warehouse',
      status: ASSET_STATUS.AVAILABLE,
      health: 100,
    };

    setAssets([newAsset, ...assets]);
    setDrawerOpen(false);
    
    // Reset form
    setName('');
    setCategory('');
    setSerial('');
    setLocation('');
  };

  const handleClear = () => {
    setSearch('');
    setStatusFilter('');
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(search.toLowerCase()) || 
                          asset.id.toLowerCase().includes(search.toLowerCase()) ||
                          asset.serial.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? asset.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: "id", header: "Asset ID" },
    { key: "name", header: "Name", render: (r) => <span style={{ fontWeight: 600 }}>{r.name}</span> },
    { key: "category", header: "Category" },
    { key: "serial", header: "Serial Num" },
    { key: "location", header: "Location" },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === ASSET_STATUS.AVAILABLE) variant = 'success';
        if (r.status === ASSET_STATUS.MAINTENANCE) variant = 'warning';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    { 
      key: "health", 
      header: "Health", 
      render: (r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${r.health}%`, height: '100%', backgroundColor: r.health > 80 ? 'var(--color-success)' : r.health > 50 ? 'var(--color-warning)' : 'var(--color-danger)' }} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600 }}>{r.health}%</span>
        </div>
      )
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Asset Management</h1>
          <p style={styles.subtitle}>Track physical machinery, testing suites, and diagnostic nodes.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)} icon={<Plus size={16} />}>
          Register Asset
        </Button>
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter assets by ID, name, serial..."
        onClear={handleClear}
        filters={[
          {
            key: "status",
            value: statusFilter,
            onChange: setStatusFilter,
            placeholder: "Filter status",
            options: statusOptions,
          }
        ]}
      />

      <Table
        columns={columns}
        data={filteredAssets}
        emptyMessage="No assets match the active search criteria."
      />

      {/* Asset Creation Drawer */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Register New Asset"
        footer={
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Save Asset</Button>
          </div>
        }
      >
        <form onSubmit={handleCreate} style={styles.drawerForm}>
          <Input
            label="Asset Name"
            placeholder="e.g. Oscilloscope Tektronix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Category"
            placeholder="e.g. Laboratory, IT, Vehicle"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            label="Serial Number"
            placeholder="e.g. SN-88231-X"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
          />
          <Input
            label="Default Storage Location"
            placeholder="e.g. Room 402, Hangar B"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </form>
      </Drawer>
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
  title: {
    fontSize: '24px',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
  },
  drawerForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
};

export default AssetsPage;
