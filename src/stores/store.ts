import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useStore = create(persist<StoreState>(
  (set) => ({
    token: null,
    setToken: (token: string | null) => set(() => ({ token })),
  }),
  {
    name: "W4S-storage",
  }
))