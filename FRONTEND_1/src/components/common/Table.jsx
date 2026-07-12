import React from 'react';
import Loader from './Loader';
import EmptyState from './EmptyState';

export const Table = ({
  columns = [], // [{ key, header, render: (row) => ... }]
  data = [],
  loading = false,
  emptyMessage = "No records found",
}) => {
  if (loading) {
    return (
      <div style={styles.stateContainer}>
        <Loader text="Loading records..." />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={styles.stateContainer}>
        <EmptyState message={emptyMessage} />
      </div>
    );
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.theadRow}>
            {columns.map((col, idx) => (
              <th key={col.key || idx} style={styles.th}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={row.id || rowIdx} style={styles.tbodyRow}>
              {columns.map((col, colIdx) => (
                <td key={col.key || colIdx} style={styles.td}>
                  {col.render ? col.render(row) : row[col.key] ?? "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableWrapper: {
    width: '100%',
    overflowX: 'auto',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--card-color)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px',
  },
  th: {
    padding: '14px 16px',
    backgroundColor: 'var(--surface-color)',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    borderBottom: '1px solid var(--border-color)',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  },
  tbodyRow: {
    transition: 'background var(--transition-fast)',
    ':hover': {
      backgroundColor: 'rgba(var(--text-muted-raw), 0.05)',
    },
  },
  stateContainer: {
    padding: '48px 0',
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Table;
