import React, { useState } from 'react';
import { CalendarRange, ShieldCheck, ShieldAlert } from 'lucide-react';
import Table from '../../components/common/Table';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import SearchFilterBar from '../../components/forms/SearchFilterBar';
import { MOCK_BOOKINGS } from '../../utils/mockData';
import { BOOKING_STATUS } from '../../utils/constants';

export const BookingsPage = () => {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [search, setSearch] = useState('');

  const handleApprove = (id) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: BOOKING_STATUS.CONFIRMED } : b)
    );
  };

  const handleReject = (id) => {
    setBookings(prev => 
      prev.map(b => b.id === id ? { ...b, status: BOOKING_STATUS.CANCELLED } : b)
    );
  };

  const filteredBookings = bookings.filter(b => 
    b.assetName.toLowerCase().includes(search.toLowerCase()) ||
    b.user.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    { key: "id", header: "Booking ID" },
    { key: "assetName", header: "Asset Requested", render: (r) => <span style={{ fontWeight: 600 }}>{r.assetName}</span> },
    { key: "user", header: "Reserving Operator" },
    { key: "startDate", header: "Start Date" },
    { key: "endDate", header: "End Date" },
    {
      key: "status",
      header: "Status",
      render: (r) => {
        let variant = 'info';
        if (r.status === BOOKING_STATUS.CONFIRMED || r.status === BOOKING_STATUS.ACTIVE || r.status === BOOKING_STATUS.COMPLETED) variant = 'success';
        if (r.status === BOOKING_STATUS.PENDING) variant = 'warning';
        if (r.status === BOOKING_STATUS.CANCELLED) variant = 'danger';
        return <Badge variant={variant}>{r.status}</Badge>;
      }
    },
    {
      key: "actions",
      header: "Authorization Actions",
      render: (r) => {
        if (r.status !== BOOKING_STATUS.PENDING) return <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Resolved</span>;
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
        searchPlaceholder="Filter reservations by asset or operator name..."
        onClear={() => setSearch('')}
      />

      <Table
        columns={columns}
        data={filteredBookings}
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

export default BookingsPage;
