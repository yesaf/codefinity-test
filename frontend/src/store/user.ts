import { TUser } from '@/types/user';
import { create } from 'zustand';

export const currentUser: TUser = {
  id: "1",
  name: "Naomi White",
  avatar: "https://randomuser.me/api/portraits/women/8.jpg",
  online: true,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec congue dui. Sed blandit vulputate tristique. Vestibulum a luctus ipsum, ac ultrices erat. Sed consequat libero nec augue venenatis blandit. Donec et diam urna. Sed sit amet mi et erat malesuada tempor quis ut nibh. Sed rhoncus iaculis nunc eget congue. Etiam maximus sit amet nulla sit amet mollis. Sed massa orci, volutpat quis metus ac, sodales eleifend est. Nullam sagittis ante quis risus convallis imperdiet. Curabitur ut scelerisque metus, id pharetra felis. Fusce lobortis in augue quis consequat. Maecenas pulvinar porta porttitor."
}

export const anotherUser: TUser = {
  id: "2",
  name: "Valera Black",
  avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  online: false
}

type TUserStore = {
  currentUser: TUser | null;
  updateCurrentUser: (user: TUser) => void;
}


export const useUserStore = create<TUserStore>((set) => ({
  currentUser: null as TUser | null,
  updateCurrentUser: (user) => set({ currentUser: user }),
}));
