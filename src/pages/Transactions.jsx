import { useEffect, useState } from 'react';
import api from '../api/client';

const CATEGORIES = ['Food', 'Rent', 'Transport', 'Subscriptions', 'Shopping', 'Health', 'Salary', 'Other'];

export default function Transactions() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ type: 'expense', amount: '', category: 'Food', note: '', date: new Date().toISOString().slice(0,10) });

  const load = () => api.get('/transactions').then(r => setItems(r.data));
  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    await api.post('/transactions', { ...form, amount: Number(form.amount) });
    setForm({ ...form, amount: '', note: '' }); load();
  };
  const remove = async (id) => { await api.delete('/transactions/' + id); load(); };

  return (
    <div className="space-y-4 mt-4">
      <h1 className="text-2xl font-bold">Transactions</h1>
      <form onSubmit={submit} className="bg-white rounded-xl shadow p-4 grid md:grid-cols-6 gap-2">
        <select className="border rounded px-2 py-2" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
          <option value="expense">Expense</option><option value="income">Income</option>
        </select>
        <input className="border rounded px-2 py-2" placeholder="Amount" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
        <select className="border rounded px-2 py-2" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <input className="border rounded px-2 py-2" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
        <input className="border rounded px-2 py-2 md:col-span-1" placeholder="Note" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
        <button className="bg-emerald-600 text-white rounded px-3 py-2">Add</button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr><th className="p-2">Date</th><th>Type</th><th>Category</th><th>Note</th><th className="text-right">Amount</th><th></th></tr>
          </thead>
          <tbody>
            {items.map(t => (
              <tr key={t._id} className="border-t">
                <td className="p-2">{new Date(t.date).toLocaleDateString()}</td>
                <td className={t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}>{t.type}</td>
                <td>{t.category}</td>
                <td>{t.note}</td>
                <td className="text-right">₹{t.amount.toFixed(2)}</td>
                <td><button onClick={() => remove(t._id)} className="text-red-500 px-2">✕</button></td>
              </tr>
            ))}
            {items.length === 0 && <tr><td colSpan="6" className="p-4 text-center text-slate-500">No transactions yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
