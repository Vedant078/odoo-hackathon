import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './Button';

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  style = {},
}) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ ...styles.container, ...style }}>
      <span style={styles.text}>
        Page <span style={{ fontWeight: 600 }}>{currentPage}</span> of <span style={{ fontWeight: 600 }}>{totalPages}</span>
      </span>

      <div style={styles.btnGroup}>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          icon={<ChevronLeft size={16} />}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          icon={<ChevronRight size={16} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    backgroundColor: 'var(--card-color)',
    borderTop: '1px solid var(--border-color)',
  },
  text: {
    fontSize: '13px',
    color: 'var(--text-secondary)',
  },
  btnGroup: {
    display: 'flex',
    gap: '8px',
  },
};

export default Pagination;
