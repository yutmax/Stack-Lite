import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "./types";

interface ApiResponse<T> {
  data: { data: T } | T;
}

export const fetchPostById = createAsyncThunk<{ post: Post }, { id: string }, { rejectValue: string }>(
  "posts/fetchPostById",
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/snippets/${id}`);
      if (!res.ok) return rejectWithValue("Failed to load post");
      const json: ApiResponse<Post> = await res.json();
      const post = (json as any)?.data?.data ?? (json as any)?.data ?? (json as any);
      if (!post?.id) return rejectWithValue("Malformed response");
      return { post };
    } catch {
      return rejectWithValue("Network error");
    }
  }
);
