import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletePost = createAsyncThunk<string, { id: string }, { rejectValue: string }>("posts/deletePost", async ({ id }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/snippets/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed delete");
    return id;
  } catch (e) {
    return rejectWithValue("Delete failed");
  }
});
