import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

// Protected Route wrapper
export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

// Admin Only Route Wrapper
export const AdminGuard = () => {
    const user = useAuthStore((state) => state.user);
  
    if (user?.role !== 'ADMIN') {
      return <Navigate to="/" replace />;
    }
  
    return <Outlet />;
};
