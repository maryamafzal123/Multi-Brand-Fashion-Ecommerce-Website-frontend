import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User, access: string, refresh: string) => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: (user, access, refresh) => {
        // Save tokens in cookies
        Cookies.set('access_token', access, { expires: 1 });
        Cookies.set('refresh_token', refresh, { expires: 30 });
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        set({ user: null, isAuthenticated: false });
      },

      updateUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage', // saved in localStorage
      skipHydration: true,
    }
  )
);