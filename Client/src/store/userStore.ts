import { create } from "zustand";

type UserDetails = {
  fullName: string;
  username: string;
  email: string;
  password: string;
};

type State = {
  userDetails: UserDetails;
};

type Action = {
  updateUserDetails: (partial: Partial<UserDetails>) => void;
  reset: () => void;
};

export const useUserStore = create<State & Action>((set) => ({
  userDetails: {
    fullName: "",
    username: "",
    email: "",
    password: "",
  },
  updateUserDetails: (partial) =>
    set((state) => ({ userDetails: { ...state.userDetails, ...partial } })),

  reset: () =>
    set({
      userDetails: {
        fullName: "",
        username: "",
        email: "",
        password: "",
      },
    }),
}));
