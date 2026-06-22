import { useEffect, useState } from 'react';
import api from '../api/client';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ec4899'];

function Kpi({ label, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className={`text-2xl font-bold ₹{color || ''}`}>₹{value.toFixed(2)}</div>
    </div>
  );
}

export default function Dashboard() {
  const [data, setData] = useState(null);
  useEffect(() => { api.get('/dashboard/summary').then(r => setData(r.data)); }, []);
  if (!data) return <div className="p-4">Loading…</div>;

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Income (MTD)" value={data.income} color="text-emerald-600" />
        <Kpi label="Expenses (MTD)" value={data.expense} color="text-red-600" />
        <Kpi label="Balance" value={data.balance} color="text-blue-600" />
        <Kpi label="Total Saved" value={data.totalSaved} color="text-amber-600" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Expenses by category</h2>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data.categoryBreakdown} dataKey="value" nameKey="name" outerRadius={100} label>
                  {data.categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip /><Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">Daily trend</h2>
          <div style={{ width: '100%', height: 280 }}>
            <ResponsiveContainer>
              <LineChart data={data.trend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" /><YAxis /><Tooltip /><Legend />
                <Line type="monotone" dataKey="income" stroke="#10b981" />
                <Line type="monotone" dataKey="expense" stroke="#ef4444" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
