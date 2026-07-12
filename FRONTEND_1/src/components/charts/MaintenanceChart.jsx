import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import Card from '../common/Card';

export const MaintenanceChart = ({ data = [] }) => {
  const COLORS = ['#737373', '#262626', '#a3a3a3'];

  return (
    <Card title="Maintenance Costs" subtitle="Overview of expenses per category ($)">
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis dataKey="assetName" stroke="var(--text-secondary)" fontSize={11} tickLine={false} />
            <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              formatter={(value) => [`$${value}`, "Cost"]}
              contentStyle={{
                backgroundColor: 'var(--card-color)',
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }}
            />
            <Bar dataKey="cost" fill="var(--color-primary)" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MaintenanceChart;
