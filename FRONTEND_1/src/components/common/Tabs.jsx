import React from 'react';

export const Tabs = ({
  tabs = [], // [{ key, label, icon }]
  activeTab,
  onChange,
  style = {},
}) => {
  return (
    <div style={{ ...styles.container, ...style }}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              ...styles.tab,
              color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
              borderColor: isActive ? 'var(--color-primary)' : 'transparent',
            }}
          >
            {tab.icon && <span style={styles.icon}>{tab.icon}</span>}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    borderBottom: '1px solid var(--border-color)',
    gap: '8px',
    overflowX: 'auto',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    fontSize: '14px',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
    outline: 'none',
  },
  icon: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: '8px',
  },
};

export default Tabs;
