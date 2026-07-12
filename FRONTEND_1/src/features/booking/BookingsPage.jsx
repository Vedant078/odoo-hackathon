import React, { useState, useEffect } from 'react';
import { CalendarRange, ShieldCheck, ShieldAlert } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import api, { getTrips, dispatchTrip, updateTrip } from '../../utils/api';

export const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [vehiclesMap, setVehiclesMap] = useState({});
  const [driversMap, setDriversMap] = useState({});
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [tripsData, vehiclesData, driversRes] = await Promise.all([
        getTrips(),
        api.get('/vehicles').then(r => r.data),
        api.get('/drivers').then(r => r.data)
      ]);

      const vMap = {};
      vehiclesData.forEach(v => { vMap[v.id] = v.vehicle_name; });
      setVehiclesMap(vMap);

      const dMap = {};
      driversRes.forEach(d => { dMap[d.id] = d.full_name; });
      setDriversMap(dMap);

      setBookings(tripsData);
    } catch (err) {
      console.error("Failed to load booking reservations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id) => {
    try {
      await dispatchTrip(id);
      await loadData();
    } catch (err) {
      console.error("Failed to approve/dispatch trip:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await updateTrip(id, { status: "Cancelled" });
      await loadData();
    } catch (err) {
      console.error("Failed to reject/cancel trip:", err);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const assetName = vehiclesMap[b.vehicle_id] || `Vehicle #${b.vehicle_id}`;
    const userName = driversMap[b.driver_id] || `Driver #${b.driver_id}`;
    const matchesAsset = assetName.toLowerCase().includes(search.toLowerCase());
    const matchesUser = userName.toLowerCase().includes(search.toLowerCase());
    const matchesSource = (b.source || "").toLowerCase().includes(search.toLowerCase());
    const matchesDest = (b.destination || "").toLowerCase().includes(search.toLowerCase());
    return matchesAsset || matchesUser || matchesSource || matchesDest;
  });

  const columns = [
    { key: "id", header: "Booking ID", render: (r) => <span>TRIP-{r.id}</span> },
    { key: "vehicle_id", header: "Asset Requested", render: (r) => <span style={{ fontWeight: 600 }}>{vehiclesMap[r.vehicle_id] || `Vehicle #${r.vehicle_id}`}</span> },
    { key: "driver_id", header: "Assigned Driver", render: (r) => <span>{driversMap[r.driver_id] || `Driver #${r.driver_id}`}</span> },
    { key: "route", header: "Route", render: (r) => <span>{r.source} ➜ {r.destination}</span> },
    { key: "cargo_weight", header: "Cargo Load", render: (r) => <span>{(r.cargo_weight || 0).toLocaleString()} kg</span> },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === "Dispatched") variant = 'success';
        if (r.status === "Completed") variant = 'success';
        if (r.status === "Draft") variant = 'warning';
        if (r.status === "Cancelled") variant = 'danger';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    {
      key: "actions",
      header: "Authorization Actions",
      render: (r) => {
        if (r.status !== "Draft") return <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Resolved ({r.status})</span>;
        return (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleApprove(r.id)} 
              icon={<ShieldCheck size={14} />}
              style={{ borderColor: 'var(--color-success)', color: 'var(--color-success)' }}
            >
              Approve
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleReject(r.id)} 
              icon={<ShieldAlert size={14} />}
              style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)' }}
            >
              Deny
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.titleSection}>
        <div style={styles.titleIcon}>
          <CalendarRange size={24} />
        </div>
        <div>
          <h1 style={styles.title}>Asset Reservations</h1>
          <p style={styles.subtitle}>Approve schedule reservations and allocate operating shifts.</p>
        </div>
      </div>

      <SearchFilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Filter reservations by asset, driver or route..."
        onClear={() => setSearch('')}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading reservations...</div>
      ) : (
        <Table
          columns={columns}
          data={filteredBookings}
          emptyMessage="No reservations match the active search criteria."
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

export default BookingsPage;
