import React, { useState, useEffect } from 'react';
import { Plus, Check, RefreshCw } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import Drawer from '../../components/common/Drawer';
import Input from '../../components/common/Input';
import { getVehicles, createVehicle } from '../../utils/api';

export const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // New asset form inputs
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [serial, setSerial] = useState('');

  const loadAssets = async () => {
    setLoading(true);
    try {
      const data = await getVehicles();
      setAssets(data);
    } catch (err) {
      console.error("Failed to load vehicles from backend:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  const statusOptions = [
    { value: "Available", label: "Available" },
    { value: "On Trip", label: "On Trip" },
    { value: "In Shop", label: "In Shop" },
  ];

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !category) return;

    const newVehicle = {
      registration_number: serial || `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicle_name: name,
      vehicle_type: category,
      max_load_capacity: 10000.0,
      odometer: 0.0,
      acquisition_cost: 45000.0,
      status: "Available"
    };

    try {
      await createVehicle(newVehicle);
      await loadAssets();
      setDrawerOpen(false);
      
      // Reset form
      setName('');
      setCategory('');
      setSerial('');
    } catch (err) {
      console.error("Failed to register vehicle:", err);
    }
  };

  const handleClear = () => {
    setSearch('');
    setStatusFilter('');
  };

  const filteredAssets = assets.filter((asset) => {
    const nameMatch = (asset.vehicle_name || "").toLowerCase().includes(search.toLowerCase());
    const regMatch = (asset.registration_number || "").toLowerCase().includes(search.toLowerCase());
    const typeMatch = (asset.vehicle_type || "").toLowerCase().includes(search.toLowerCase());
    const matchesSearch = nameMatch || regMatch || typeMatch;
    const matchesStatus = statusFilter ? asset.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  const columns = [
    { key: "id", header: "Asset ID", render: (r) => <span>VEH-{r.id}</span> },
    { key: "vehicle_name", header: "Name", render: (r) => <span style={{ fontWeight: 600 }}>{r.vehicle_name}</span> },
    { key: "vehicle_type", header: "Category" },
    { key: "registration_number", header: "Registration Num" },
    { key: "odometer", header: "Odometer (km)", render: (r) => <span>{(r.odometer || 0).toLocaleString()} km</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === "Available") variant = 'success';
        if (r.status === "In Shop") variant = 'warning';
        if (r.status === "On Trip") variant = 'info';
        if (r.status === "Retired") variant = 'danger';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    { 
      key: "health", 
      header: "Health", 
      render: (r) => {
        const health = Math.max(100 - Math.min(Math.floor((r.odometer || 0) / 2000), 40), 50);
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '60px', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: `${health}%`, height: '100%', backgroundColor: health > 80 ? 'var(--color-success)' : health > 50 ? 'var(--color-warning)' : 'var(--color-danger)' }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600 }}>{health}%</span>
          </div>
        );
      }
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Asset Management</h1>
          <p style={styles.subtitle}>Track physical trucks, delivery vans, and logistics transport assets.</p>
        </div>
        <Button onClick={() => setDrawerOpen(true)} icon={<Plus size={16} />}>
          Register Asset
        </Button>
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter assets by name, registration..."
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

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading assets...</div>
      ) : (
        <Table
          columns={columns}
          data={filteredAssets}
          emptyMessage="No assets match the active search criteria."
        />
      )}

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
            label="Vehicle Name"
            placeholder="e.g. Heavy Duty Cargo Truck"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Vehicle Type (Category)"
            placeholder="e.g. Truck, Van, Flatbed"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <Input
            label="Registration Number"
            placeholder="e.g. TX-ON-1001"
            value={serial}
            onChange={(e) => setSerial(e.target.value)}
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
