import { create } from "zustand";

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

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoggedIn: null,
  setUser: (user: User) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));
 