import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card from '../common/Card';

export const UtilizationChart = ({ data = [] }) => {
  return (
    <Card title="Asset Utilization History" subtitle="Comparative analysis across item categories">
      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHardware" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.0}/>
              </linearGradient>
              <linearGradient id="colorLab" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
            <XAxis 
              dataKey="month" 
              stroke="var(--text-secondary)" 
              fontSize={12} 
              tickLine={false} 
            />
            <YAxis 
              stroke="var(--text-secondary)" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false} 
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--card-color)', 
                borderColor: 'var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-primary)'
              }} 
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Area 
              type="monotone" 
              dataKey="Hardware" 
              stroke="var(--color-primary)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorHardware)" 
            />
            <Area 
              type="monotone" 
              dataKey="LabEquipment" 
              name="Lab Equipment"
              stroke="var(--color-success)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorLab)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UtilizationChart;
