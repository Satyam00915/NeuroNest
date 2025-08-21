import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  fullName: string;
  email: string;
  username: string;
  avatarUrl: string;
}

interface AuthState {
  user: null | User;
  isLoggedIn: boolean | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user: User) => set({ user, isLoggedIn: true }),
      logout: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage", // 🔑 key in localStorage
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
      }), // optional: only persist part of the state
    }
  )
);
