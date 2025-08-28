import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Post } from "../../../../entities/post/model/types";

// mark can be 'like' | 'dislike' | 'none' (to remove existing mark)
export const markPost = createAsyncThunk<{ post: Post }, { id: string; mark: "like" | "dislike" | "none"; userId: number; username?: string | null; role?: string | null }, { rejectValue: string }>("posts/markPost", async ({ id, mark }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/snippets/${id}/mark`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mark }),
      credentials: "include",
    });
    if (!res.ok) {
      let message = `Failed to mark post (${res.status})`;
      try {
        const errJson = await res.json();
        message = errJson.message || message;
      } catch {}
      return rejectWithValue(message);
    }
    const json = await res.json();

    const post: Post | undefined = json?.data?.data ?? json?.data ?? json;
    if (!post || !post.id) {
      return rejectWithValue("Malformed server response");
    }
    return { post };
  } catch (e) {
    return rejectWithValue("Network error");
  }
});
