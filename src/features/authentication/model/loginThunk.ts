import { createAsyncThunk } from "@reduxjs/toolkit";

type LoginPayload = {
  username: string;
  password: string;
};

export const loginUser = createAsyncThunk("user/login", async (data: LoginPayload, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      let message = "Login failed";
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      return rejectWithValue(message);
    }
    return response.json();
  } catch (error) {
    return rejectWithValue("Network error");
  }
});
