import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function UserGrowthChart() {
  // Dummy data for monthly user growth
  const data = [
    { month: 'Jan', users: 50 },
    { month: 'Feb', users: 100 },
    { month: 'Mar', users: 100 },
    { month: 'Apr', users: 400 },
    { month: 'May', users: 500 },
    { month: 'Jun', users: 50 },
    { month: 'Jul', users: 700 },
    { month: 'Aug', users: 800 },
    { month: 'Sep', users: 500 },
    { month: 'Oct', users: 452 },
    { month: 'Nov', users: 800 },
    { month: 'Dec', users: 500 },
  ];

  return (
    <div className="w-full h-96">
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis dataKey="users" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="users" stroke="#82ca9d" name="New Users" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
