import React from 'react';
import { Search, RotateCcw } from 'lucide-react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';

export const SearchFilterBar = ({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters = [], // [{ key, value, onChange, options = [], placeholder }]
  onClear,
}) => {
  const showClear = searchValue || filters.some(f => f.value);

  return (
    <div style={styles.container}>
      <div style={styles.searchWrapper}>
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search size={18} />}
        />
      </div>

      <div style={styles.filtersWrapper}>
        {filters.map((f, idx) => (
          <div key={f.key || idx} style={styles.filterItem}>
            <Select
              placeholder={f.placeholder}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              options={f.options}
            />
          </div>
        ))}

        {showClear && (
          <Button
            variant="secondary"
            onClick={onClear}
            icon={<RotateCcw size={16} />}
            style={{ height: '42px', flexShrink: 0 }}
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '16px 20px',
    backgroundColor: 'var(--card-color)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    marginBottom: '20px',
  },
  searchWrapper: {
    flexGrow: 1,
    minWidth: '240px',
    maxWidth: '400px',
  },
  filtersWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    alignItems: 'center',
  },
  filterItem: {
    width: '160px',
  },
};

export default SearchFilterBar;
