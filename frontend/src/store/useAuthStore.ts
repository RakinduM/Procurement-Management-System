import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';

export interface User {
  username: string;
  role: string;
  userId: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, username: string, role: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,

      setAuth: (token: string, username: string, role: string) => {
        try {
          // Decode to get userId if available, or just rely on what's passed
          const decoded = jwtDecode<any>(token);
          
          set({
            token,
            user: {
              username,
              role,
              userId: decoded.userId || '',
            },
            isAuthenticated: true,
          });
        } catch (e) {
            console.error('Invalid token');
        }
      },

      logout: () => {
        set({ token: null, user: null, isAuthenticated: false });
        window.location.href = '/login';
      },
    }),
    {
      name: 'auth-storage', // name of item in the storage (must be unique)
    }
  )
);
