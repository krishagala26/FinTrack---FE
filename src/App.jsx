import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Goals from './pages/Goals';

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-8">Loading…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function Nav() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  if (!user) return null;
  const link = "px-3 py-2 rounded hover:bg-slate-100";
  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-emerald-600 text-lg">FinTrack</Link>
        <div className="flex gap-1 items-center">
          <Link className={link} to="/">Dashboard</Link>
          <Link className={link} to="/transactions">Transactions</Link>
          <Link className={link} to="/budgets">Budgets</Link>
          <Link className={link} to="/goals">Goals</Link>
          <span className="ml-4 text-sm text-slate-500">{user.name}</span>
          <button onClick={() => { logout(); nav('/login'); }} className="ml-2 px-3 py-1 text-sm rounded bg-slate-900 text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-6xl mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/transactions" element={<Protected><Transactions /></Protected>} />
          <Route path="/budgets" element={<Protected><Budgets /></Protected>} />
          <Route path="/goals" element={<Protected><Goals /></Protected>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
