import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../common/Card';

export const BookingHeatmap = ({ data = [] }) => {
  return (
    <Card title="Peak Booking Heatmap" subtitle="Active reservation allocations by hourly intervals">
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="day" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card-color)',
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Bar dataKey="08:00" stackId="a" fill="#818cf8" />
            <Bar dataKey="12:00" stackId="a" fill="#4f46e5" />
            <Bar dataKey="16:00" stackId="a" fill="#312e81" />
            <Bar dataKey="20:00" stackId="a" fill="#c7d2fe" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default BookingHeatmap;
