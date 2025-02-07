import { create } from "zustand";


export type UserStore = {
    user: string;
    setUser: (user: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: '',
    setUser: (user) => set({
        user
    })
}));

export default useUserStore;