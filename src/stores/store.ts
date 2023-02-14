import { create } from 'zustand';
import { persist } from 'zustand/middleware';

enum UserType {
  Student, Company, Admin
};

interface StoreState {
  token: string | null;
  userType: UserType | null;
  setToken: (token: string | null) => void;
  setUserType: (userType: UserType | null) => void;
}

export const useStore = create(persist<StoreState>(
  (set) => ({
    token: null,
    userType: null,
    setToken: (token: string | null) => set(() => ({ token })),
    setUserType: (userType: UserType | null) => set(() => ({ userType })),
  }),
  {
    name: "W4S-storage",
  }
))