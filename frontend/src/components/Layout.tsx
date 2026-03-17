import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import {
  LayoutDashboard,
  Users,
  Truck,
  FileText,
  ShoppingCart,
  CheckSquare,
  LogOut,
  Bell
} from 'lucide-react';
import React from 'react';

const Layout = () => {
  const { user, logout } = useAuthStore();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Purchase Requests', path: '/pr', icon: FileText },
    { name: 'Purchase Orders', path: '/po', icon: ShoppingCart },
    { name: 'Approvals', path: '/approvals', icon: CheckSquare, roles: ['APPROVER', 'ADMIN'] },
    { name: 'Suppliers', path: '/suppliers', icon: Truck },
    { name: 'Users', path: '/users', icon: Users, roles: ['ADMIN'] },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 flex-shrink-0 flex flex-col border-r border-slate-800 shadow-2xl transition-all duration-300">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
           <h1 className="text-xl font-bold text-white tracking-widest">
            <span className="text-primary-500">PRO</span>CURE
           </h1>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              if (item.roles && !item.roles.includes(user?.role || '')) return null;

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-600/10 text-primary-400'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                    }`
                  }
                >
                  {({ isActive }) => (
                     <>
                        <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 transition-colors ${
                          isActive ? 'text-primary-500' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                        aria-hidden="true"
                        />
                        {item.name}
                     </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
        
        {/* User Card */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center space-x-3">
             <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold shadow-lg">
               {user?.username?.charAt(0).toUpperCase()}
             </div>
             <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-white truncate">{user?.username}</p>
               <p className="text-xs text-slate-400 capitalize truncate">{user?.role.toLowerCase()}</p>
             </div>
             <button
               onClick={logout}
               className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
               title="Logout"
             >
               <LogOut className="h-5 w-5" />
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col w-0 overflow-hidden relative">
        {/* Topbar */}
        <header className="flex-shrink-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
           <h2 className="text-xl font-semibold text-slate-800">Welcome back, {user?.username}</h2>
           
           <div className="flex items-center space-x-4">
              {/* Notification Bell stub - We will integrate WebSocket here later */}
              <button className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors rounded-full hover:bg-slate-100">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto h-full">
             <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
