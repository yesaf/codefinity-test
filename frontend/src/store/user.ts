import { TUser } from '@/types/user';
import { create } from 'zustand';

type TUserStore = {
  currentUser: TUser | null;
  updateCurrentUser: (user: TUser) => void;
}


export const useUserStore = create<TUserStore>((set) => ({
  currentUser: null as TUser | null,
  updateCurrentUser: (user) => set({ currentUser: user }),
}));
