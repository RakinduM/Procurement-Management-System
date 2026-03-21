import React from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { canAccessPage } from '../lib/rbac';
import { ShieldOff } from 'lucide-react';

interface RoleGuardProps {
  /** The route path used to look up the allowed roles in PAGE_ROLES config. */
  path: string;
}

/**
 * RoleGuard — wraps a route and redirects to /unauthorized
 * if the current user's role is not allowed for the given path.
 */
export const RoleGuard: React.FC<RoleGuardProps> = ({ path }) => {
  const user = useAuthStore((state) => state.user);

  if (!canAccessPage(user?.role, path)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

/**
 * UnauthorizedPage — shown when a user tries to access a page they don't have permission for.
 */
export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="h-20 w-20 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center mb-6">
        <ShieldOff className="h-10 w-10 text-red-400" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
      <p className="text-slate-500 text-sm max-w-sm mb-6">
        You don't have permission to view this page. Contact your administrator if you believe this is a mistake.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-5 py-2.5 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors shadow-sm"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default RoleGuard;
