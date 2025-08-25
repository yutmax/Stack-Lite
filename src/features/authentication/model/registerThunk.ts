import { createAsyncThunk } from "@reduxjs/toolkit";

type RegisterPayload = {
  username: string;
  password: string;
};

export const registerUser = createAsyncThunk("auth/register", async (data: RegisterPayload, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      let message = "Registration failed";
      try {
        const errorData = await response.json();
        message = errorData.message || message;
      } catch {}
      return rejectWithValue(message);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue("Network error");
  }
});
