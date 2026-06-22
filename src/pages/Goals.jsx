import { useEffect, useState } from 'react';
import api from '../api/client';

export default function Goals() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', targetAmount: '', savedAmount: '', deadline: '' });

  const load = () => api.get('/goals').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/goals', { ...form, targetAmount: Number(form.targetAmount), savedAmount: Number(form.savedAmount || 0) });
    setForm({ name: '', targetAmount: '', savedAmount: '', deadline: '' }); load();
  };
  const addContribution = async (g, amt) => { await api.put('/goals/' + g._id, { savedAmount: g.savedAmount + amt }); load(); };
  const remove = async (id) => { await api.delete('/goals/' + id); load(); };

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">Savings Goals</h1>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 grid md:grid-cols-5 gap-2">
        <input className="border rounded px-2 py-2" placeholder="Goal name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input className="border rounded px-2 py-2" type="number" placeholder="Target" value={form.targetAmount} onChange={e => setForm({ ...form, targetAmount: e.target.value })} required />
        <input className="border rounded px-2 py-2" type="number" placeholder="Saved" value={form.savedAmount} onChange={e => setForm({ ...form, savedAmount: e.target.value })} />
        <input className="border rounded px-2 py-2" type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
        <button className="bg-emerald-600 text-white rounded">Add</button>
      </form>

      <div className="grid md:grid-cols-2 gap-3">
        {items.map(g => {
          const pct = Math.min(100, (g.savedAmount / g.targetAmount) * 100);
          return (
            <div key={g._id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between">
                <div className="font-semibold">{g.name}</div>
                <button onClick={() => remove(g._id)} className="text-red-500">✕</button>
              </div>
              <div className="text-sm text-slate-600">₹{g.savedAmount.toFixed(2)} / ₹{g.targetAmount.toFixed(2)}</div>
              {g.deadline && <div className="text-xs text-slate-500">By {new Date(g.deadline).toLocaleDateString()}</div>}
              <div className="h-2 bg-slate-200 rounded mt-2"><div className="h-2 rounded bg-blue-500" style={{ width: pct + '%' }} /></div>
              <div className="mt-2 flex gap-2">
                <button onClick={() => addContribution(g, 50)} className="text-xs px-2 py-1 rounded bg-slate-100">+₹50</button>
                <button onClick={() => addContribution(g, 100)} className="text-xs px-2 py-1 rounded bg-slate-100">+₹100</button>
              </div>
            </div>
          );
        })}
        {items.length === 0 && <div className="text-slate-500">No goals yet</div>}
      </div>
    </div>
  );
}
