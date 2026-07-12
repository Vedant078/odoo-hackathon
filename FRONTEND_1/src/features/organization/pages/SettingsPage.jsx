import React, { useState } from 'react';
import Card from '../../../components/common/Card';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

export const SettingsPage = () => {
  const [notifyInterval, setNotifyInterval] = useState('7');
  const [calibrationCheck, setCalibrationCheck] = useState(true);

  return (
    <div style={styles.container}>
      <h2 style={styles.sectionHeader}>System Parameters</h2>
      
      <div style={styles.grid}>
        <Card title="Alerting Thresholds" subtitle="Configure calibration reminder intervals">
          <div style={styles.form}>
            <Input
              label="Warning Interval (Days)"
              type="number"
              value={notifyInterval}
              onChange={(e) => setNotifyInterval(e.target.value)}
              helperText="Days remaining before flagging an asset status as calibration overdue"
            />
            <div style={styles.switchRow}>
              <input 
                type="checkbox" 
                id="calCheck" 
                checked={calibrationCheck} 
                onChange={(e) => setCalibrationCheck(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="calCheck" style={styles.switchLabel}>
                Enforce daily hardware compliance verification
              </label>
            </div>
            <div style={{ marginTop: '8px' }}>
              <Button onClick={() => alert('Settings saved successfully!')}>
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
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
  grid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '400px',
  },
  switchRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  switchLabel: {
    fontSize: '14px',
    color: 'var(--text-secondary)',
    fontWeight: 500,
    cursor: 'pointer',
  },
};

export default SettingsPage;
