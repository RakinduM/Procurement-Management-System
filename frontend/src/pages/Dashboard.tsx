import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { ShoppingCart, FileText, CheckSquare, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  const stats = [
    { title: 'Pending PRs', value: '12', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-100' },
    { title: 'Pending POs', value: '4', icon: ShoppingCart, color: 'text-purple-500', bg: 'bg-purple-100' },
    { title: 'Awaiting Approvals', value: '7', icon: CheckSquare, color: 'text-amber-500', bg: 'bg-amber-100' },
    { title: 'Total Spend (Monthly)', value: '$45,200', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
          <p className="text-slate-500">Here's what's happening in your procurement process today.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                <div>
                   <p className="text-sm font-medium text-slate-900">PR #PR202501 Created</p>
                   <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
            </div>
            <div className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></div>
                <div>
                   <p className="text-sm font-medium text-slate-900">PO #PO202511 Approved</p>
                   <p className="text-xs text-slate-500">5 hours ago</p>
                </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
          <div className="flex flex-col gap-3">
             <button className="text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 transition-colors text-sm font-medium text-slate-700">
                 + Create New Purchase Request
             </button>
             {user?.role === 'APPROVER' || user?.role === 'ADMIN' ? (
                <button className="text-left px-4 py-3 rounded-xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50 transition-colors text-sm font-medium text-slate-700">
                    Review Pending Approvals
                </button>
             ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
