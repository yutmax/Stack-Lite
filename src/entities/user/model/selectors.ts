import type { RootState } from "../../../app/providers/store/store";

export const selectUser = (state: RootState) => state.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;
