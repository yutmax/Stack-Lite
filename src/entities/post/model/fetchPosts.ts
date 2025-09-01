import { createAsyncThunk } from "@reduxjs/toolkit";
import type { MetaByPost, Post } from "./types";

interface ApiResponse {
  data: {
    data: Post[];
    meta: MetaByPost;
    links: Record<string, string>;
  };
}

export const fetchPosts = createAsyncThunk<{ items: Post[]; meta: MetaByPost }, { page?: number; limit?: number; userId?: number | null }, { rejectValue: string }>("posts/fetchPosts", async ({ page = 1, limit = 10, userId }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams();
    params.set("page", String(page));
    params.set("limit", String(limit));
    if (userId != null) params.set("userId", String(userId));

    const res = await fetch(`/api/snippets?${params.toString()}`);
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
