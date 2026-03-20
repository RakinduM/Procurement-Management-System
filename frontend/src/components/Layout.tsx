import React, { useEffect, useState } from 'react';
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
  Bell,
  X
} from 'lucide-react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getNavItems } from '../lib/rbac';

const Layout = () => {
  const { user, logout } = useAuthStore();
  const [notifications, setNotifications] = useState<{id: number, message: string}[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!user) return; // Keep disconnected if not logged in

    const stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8085/ws-approvals'),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('Connected to WebSockets!');
        stompClient.subscribe('/topic/approvals', (statusUpdate) => {
          const newMsg = statusUpdate.body;
          const id = Date.now();
          setNotifications((prev) => [...prev, { id, message: newMsg }]);
          
          // Auto remove toast after 5 seconds
          setTimeout(() => {
            setNotifications((prev) => prev.filter(n => n.id !== id));
          }, 5000);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [user]);

  const removeNotification = (id: number) => {
      setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const iconMap: Record<string, React.FC<any>> = {
    '/': LayoutDashboard,
    '/pr': FileText,
    '/po': ShoppingCart,
    '/approvals': CheckSquare,
    '/suppliers': Truck,
    '/users': Users,
  };

  const navItems = getNavItems(user?.role);

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
              const Icon = iconMap[item.path] || LayoutDashboard;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
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
                      <Icon
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
              {/* Notification Bell */}
              <div className="relative">
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="relative p-2 text-slate-400 hover:text-primary-600 transition-colors rounded-full hover:bg-slate-100 focus:outline-none"
                >
                  <Bell className="h-5 w-5" />
                  {notifications.length > 0 && (
                     <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                  )}
                </button>
                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-100 z-50 overflow-hidden">
                     <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <h3 className="text-sm font-bold text-slate-900">Notifications</h3>
                     </div>
                     <div className="max-h-64 overflow-y-auto p-2">
                        {notifications.length === 0 ? (
                           <div className="p-4 text-center text-sm text-slate-500">No new notifications</div>
                        ) : (
                           notifications.map(n => (
                             <div key={n.id} className="p-3 mb-1 bg-primary-50 rounded-lg text-sm text-primary-800 flex justify-between items-start">
                                <span>{n.message}</span>
                                <button onClick={() => removeNotification(n.id)} className="text-primary-400 hover:text-primary-600">
                                   <X className="h-4 w-4" />
                                </button>
                             </div>
                           ))
                        )}
                     </div>
                  </div>
                )}
              </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none p-6 bg-slate-50/50">
          <div className="max-w-7xl mx-auto h-full">
             <Outlet />
          </div>
        </main>

        {/* Floating Toasts Area */}
        <div className="absolute bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
           {notifications.map(n => (
             <div key={`toast-${n.id}`} className="bg-white px-5 py-4 rounded-xl shadow-xl border border-slate-100 pointer-events-auto flex items-center gap-3 animate-in slide-in-from-right-8 fade-in duration-300">
                <div className="h-8 w-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                  <Bell className="h-4 w-4" />
                </div>
                <p className="text-sm font-medium text-slate-800">{n.message}</p>
                <button onClick={() => removeNotification(n.id)} className="ml-2 text-slate-400 hover:text-slate-600">
                  <X className="h-4 w-4" />
                </button>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Layout;
