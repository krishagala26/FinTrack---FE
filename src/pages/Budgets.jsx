import { formatINR } from "../utils/currency";
import { useEffect, useState } from 'react';
import api from '../api/client';

const month = () => new Date().toISOString().slice(0, 7);

export default function Budgets() {
  const [items, setItems] = useState([]);
  const [txns, setTxns] = useState([]);
  const [form, setForm] = useState({ category: '', limit: '', month: month() });

  const load = async () => {
    const [b, t] = await Promise.all([api.get('/budgets'), api.get('/transactions')]);
    setItems(b.data); setTxns(t.data);
  };
  useEffect(() => { load(); }, []);

  const spent = (cat) => txns.filter(t => t.type === 'expense' && t.category === cat).reduce((s, t) => s + t.amount, 0);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/budgets', { ...form, limit: Number(form.limit) });
    setForm({ ...form, category: '', limit: '' }); load();
  };
  const remove = async (id) => { await api.delete('/budgets/' + id); load(); };

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">Budgets</h1>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 flex gap-2 flex-wrap">
        <input className="border rounded px-2 py-2 flex-1" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required />
        <input className="border rounded px-2 py-2 w-32" placeholder="Limit" type="number" value={form.limit} onChange={e => setForm({ ...form, limit: e.target.value })} required />
        <input className="border rounded px-2 py-2" type="month" value={form.month} onChange={e => setForm({ ...form, month: e.target.value })} />
        <button className="bg-emerald-600 text-white rounded px-4">Add</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3">
        {items.map(b => {
          const s = spent(b.category);
          const pct = Math.min(100, (s / b.limit) * 100);
          const color = pct >= 100 ? 'bg-red-500' : pct >= 80 ? 'bg-amber-500' : 'bg-emerald-500';
          return (
            <div key={b._id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center">
                <div className="font-semibold">{b.category} <span className="text-xs text-slate-500">({b.month})</span></div>
                <button onClick={() => remove(b._id)} className="text-red-500">✕</button>
              </div>
              <div className="text-sm text-slate-600 mt-1">₹{s.toFixed(2)} of ₹{b.limit.toFixed(2)}</div>
              <div className="h-2 bg-slate-200 rounded mt-2"><div className={`h-2 rounded ₹{color}`} style={{ width: pct + '%' }} /></div>
              {pct >= 100 && <div className="text-xs text-red-600 mt-1">Over budget!</div>}
              {pct >= 80 && pct < 100 && <div className="text-xs text-amber-600 mt-1">Approaching limit</div>}
            </div>
          );
        })}
        {items.length === 0 && <div className="text-slate-500">No budgets yet</div>}
      </div>
    </div>
  );
}
