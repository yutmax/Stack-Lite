import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  isAuth: boolean;
  username: string | null;
  role: string | null;
  id: number | null;
};

const initialState: UserState = {
  isAuth: false,
  username: null,
  role: null,
  id: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; role: string; id: number }>) {
      state.isAuth = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    logout(state) {
      state.isAuth = false;
      state.username = null;
      state.role = null;
      state.id = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
