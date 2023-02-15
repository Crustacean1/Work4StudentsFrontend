import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserType {
  Student = 0, Company = 1, Admin = 2, None = 3
};

interface StoreState {
  token: string | null;
  userId: string | null;
  userProfileId: string | null;
  userType: UserType | null;
  setToken: (token: string | null) => void;
  setUserId: (userId: string | null) => void;
  setUserType: (userType: UserType | null) => void;
  setUserProfileId: (userProfileId: string | null) => void;
}

export const useStore = create(persist<StoreState>(
  (set) => ({
    token: null,
    userId: null,
    userProfileId: null,
    userType: null,
    setToken: (token: string | null) => set(() => ({ token })),
    setUserId: (userId: string | null) => set(() => ({ userId })),
    setUserType: (userType: UserType | null) => set(() => ({ userType })),
    setUserProfileId: (userProfileId: string | null) => set(() => ({ userProfileId })),
  }),
  {
    name: "W4S-storage",
  }
))