import { useState, useEffect } from 'react';
import { ShoppingBag, Clock, CheckCircle, Package, LogOut, RefreshCw, Lock, Ban } from 'lucide-react';
import { adminLogin, getDashboard, updateOrderStatus } from '../services/api';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  confirmed: 'bg-blue-100 text-blue-700 border border-blue-200',
  completed: 'bg-green-100 text-green-700 border border-green-200',
  cancelled: 'bg-red-100 text-red-700 border border-red-200',
};

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('admin_token') || '');
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [loginErr, setLoginErr] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async (t) => {
    setLoading(true);
    try {
      const res = await getDashboard(t || token);
      setDashboard(res.data);
    } catch {
      setToken('');
      sessionStorage.removeItem('admin_token');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchDashboard();
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginErr('');
    try {
      const res = await adminLogin(creds);
      const t = res.data.access_token;
      setToken(t);
      sessionStorage.setItem('admin_token', t);
    } catch {
      setLoginErr('Invalid username or password. Try saloni / saloni@admin123');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    setToken('');
    setDashboard(null);
    sessionStorage.removeItem('admin_token');
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchDashboard();
    } catch {
      alert('Failed to update status');
    }
  };

  if (!token)
    return (
      <div className="pt-20 min-h-screen petal-bg flex items-center justify-center px-6">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-rose-200">
              <Lock size={28} className="text-white" />
            </div>
            <p className="font-accent text-rose-400 text-xl">Admin Access</p>
            <h1 className="font-display text-3xl font-bold text-rose-900">Saloni Dashboard</h1>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-3xl p-8 shadow-xl shadow-rose-100 space-y-5">
            <div>
              <label className="label">Username</label>
              <input
                className="input-field"
                placeholder="saloni"
                value={creds.username}
                onChange={(e) => setCreds((c) => ({ ...c, username: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="label">Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="**********"
                value={creds.password}
                onChange={(e) => setCreds((c) => ({ ...c, password: e.target.value }))}
                required
              />
            </div>
            {loginErr && <p className="text-red-500 text-sm font-body bg-red-50 p-3 rounded-xl">{loginErr}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loginLoading ? <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : null}
              Sign In
            </button>
            <p className="text-center text-gray-400 text-xs font-body">Default: saloni / saloni@admin123</p>
          </form>
        </div>
      </div>
    );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-accent text-rose-200 text-lg">Welcome back,</p>
            <h1 className="font-display text-2xl font-bold">Saloni Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => fetchDashboard()}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-body transition-colors"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-body transition-colors"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {loading && !dashboard && (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 font-body">Loading dashboard...</p>
          </div>
        )}

        {dashboard && (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              {[
                { label: 'Total Orders', value: dashboard.stats.total_orders, icon: <ShoppingBag size={20} />, color: 'from-rose-500 to-pink-600' },
                { label: 'Pending', value: dashboard.stats.pending, icon: <Clock size={20} />, color: 'from-yellow-400 to-orange-500' },
                { label: 'Confirmed', value: dashboard.stats.confirmed, icon: <Package size={20} />, color: 'from-blue-400 to-blue-600' },
                { label: 'Completed', value: dashboard.stats.completed, icon: <CheckCircle size={20} />, color: 'from-green-400 to-green-600' },
                { label: 'Cancelled', value: dashboard.stats.cancelled, icon: <Ban size={20} />, color: 'from-red-400 to-red-600' },
              ].map(({ label, value, icon, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-3 shadow-md`}>
                    {icon}
                  </div>
                  <p className="font-display text-3xl font-bold text-gray-900">{value}</p>
                  <p className="text-gray-500 text-sm font-body">{label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-gray-900">All Orders</h2>
                <span className="text-xs text-gray-400 font-body">{dashboard.all_orders.length} orders</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-rose-50">
                    <tr>
                      {['ID', 'Customer', 'Phone', 'Occasion', 'Product', 'Delivery', 'Status', 'Action'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-rose-700 uppercase tracking-wider font-body">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {dashboard.all_orders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-gray-400 font-body">No orders yet.</td>
                      </tr>
                    ) : (
                      dashboard.all_orders.map((order) => (
                        <tr key={order.id} className="hover:bg-rose-50/50 transition-colors">
                          <td className="px-4 py-3 text-sm font-bold text-rose-500 font-body">#{order.id}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800 font-body">{order.name}</td>
                          <td className="px-4 py-3 text-sm text-gray-500 font-body">{order.phone}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-body">{order.occasion}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-body max-w-[150px] truncate">{order.product}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-body">{order.delivery_date}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full font-body ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusChange(order.id, e.target.value)}
                              className="text-xs border border-gray-200 rounded-lg px-2 py-1.5 font-body focus:outline-none focus:ring-1 focus:ring-rose-300 bg-white"
                            >
                              {STATUS_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-gray-900">Recent Activity</h2>
                <span className="text-xs text-gray-400 font-body">{dashboard.recent_activities.length} events</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-rose-50">
                    <tr>
                      {['Time', 'Order', 'Action', 'Details'].map((h) => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-bold text-rose-700 uppercase tracking-wider font-body">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {dashboard.recent_activities.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-12 text-gray-400 font-body">No activity yet.</td>
                      </tr>
                    ) : (
                      dashboard.recent_activities.map((activity) => (
                        <tr key={activity.id} className="hover:bg-rose-50/50 transition-colors">
                          <td className="px-4 py-3 text-sm text-gray-500 font-body">{new Date(activity.created_at).toLocaleString('en-IN')}</td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-800 font-body">#{activity.order_id}</td>
                          <td className="px-4 py-3 text-sm text-rose-600 font-semibold font-body">{activity.action}</td>
                          <td className="px-4 py-3 text-sm text-gray-600 font-body">{activity.note || '-'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
