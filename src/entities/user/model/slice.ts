import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
      console.log(action.payload.username);
      console.log(action.payload.id);
      console.log(action.payload.role);
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

export const registerUser = createAsyncThunk("user/register", async (data: { username: string; password: string }) => {
  const response = await fetch("https://codelang.vercel.app/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }
  return await response.json();
});

export const loginUser = createAsyncThunk("user/login", async (data: { username: string; password: string }) => {
  const response = await fetch("https://codelang.vercel.app/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Login failed");
  }
  return await response.json();
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
