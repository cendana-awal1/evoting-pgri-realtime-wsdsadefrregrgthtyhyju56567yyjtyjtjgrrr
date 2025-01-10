import { create } from 'zustand';
import { pb } from '../lib/pocketbase';
import type { User } from '../lib/pocketbase';

interface AuthState {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    const authData = await pb.collection('users').authWithPassword(email, password);
    set({ user: authData.record });
  },
  logout: () => {
    pb.authStore.clear();
    set({ user: null });
  },
  register: async (email: string, password: string, name: string) => {
    await pb.collection('users').create({
      email,
      password,
      passwordConfirm: password,
      name,
    });
    await pb.collection('users').authWithPassword(email, password);
    set({ user: pb.authStore.model });
  },
}));