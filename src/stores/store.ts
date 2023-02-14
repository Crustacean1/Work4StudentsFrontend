import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserType {
  Student, Company, Admin, None
};

interface StoreState {
  token: string | null;
  userId: string | null;
  userType: UserType | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  setUserType: (userType: UserType | null) => void;
}

export const useStore = create(persist<StoreState>(
  (set) => ({
    token: null,
    userId: null,
    userType: null,
    setToken: (token: string | null) => set(() => ({ token })),
    setUserId: (userId: string | null) => set(() => ({ userId })),
    setUserType: (userType: UserType | null) => set(() => ({ userType })),
  }),
  {
    name: "W4S-storage",
  }
))