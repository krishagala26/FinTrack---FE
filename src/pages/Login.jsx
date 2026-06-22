import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setErr('');
    try { await login(form.email, form.password); nav('/'); }
    catch (e) { setErr(e.response?.data?.message || 'Login failed'); }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Welcome back</h1>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="w-full bg-emerald-600 text-white py-2 rounded">Login</button>
      </form>
      <p className="text-sm mt-3">No account? <Link to="/register" className="text-emerald-600">Register</Link></p>
    </div>
  );
}
