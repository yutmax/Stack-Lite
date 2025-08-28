import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MetaByPost, Post } from "./types";

interface ApiResponse {
  data: {
    data: Post[];
    meta: MetaByPost;
    links: Record<string, string>;
  };
}

export const fetchPosts = createAsyncThunk<{ items: Post[]; meta: MetaByPost }, { page?: number; limit?: number }, { rejectValue: string }>("posts/fetchPosts", async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/snippets?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const json: ApiResponse = await res.json();
    const inner = json.data;
    return {
      items: inner?.data ?? [],
      meta: inner.meta,
    };
  } catch (error) {
    return rejectWithValue("Network error");
  }
});
