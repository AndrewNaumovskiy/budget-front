import { UserStore } from "../stores/userStore";

export const getUser = (state: UserStore) => state.user;