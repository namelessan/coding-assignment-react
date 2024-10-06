import { create } from 'zustand';
import { User } from '../type';

interface UserState {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [],
  setUsers: (users: User[]) => set((state) => ({ users })),
}));
