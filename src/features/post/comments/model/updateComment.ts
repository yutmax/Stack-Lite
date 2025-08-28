import { createAsyncThunk } from "@reduxjs/toolkit";
import { upsertComment } from "../../../../entities/post/model/slice";
import type { RootState, AppDispatch } from "../../../../app/providers/store/store";

export const updateComment = createAsyncThunk<{ postId: string; comment: any }, { id: string; postId: string; content: string }, { state: RootState; dispatch: AppDispatch; rejectValue: string }>("comments/updateComment", async ({ id, postId, content }, { dispatch, rejectWithValue }) => {
  try {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
      credentials: "include",
    });
    if (!res.ok) {
      let msg = `Failed to update comment (${res.status})`;
      try {
        const err = await res.json();
        msg = err.message || msg;
      } catch {}
      return rejectWithValue(msg);
    }

    let updated: any = null;
    if (res.status !== 204) {
      const text = await res.text();
      if (text) {
        try {
          const json = JSON.parse(text);
          updated = (json as any)?.data?.data ?? (json as any)?.data?.comment ?? (json as any)?.comment ?? (json as any)?.data ?? json;
        } catch {}
      }
    }

    if (!updated || !updated.id) {
      // fallback if API returns nothing: construct from known data
      updated = { id, content };
    } else if (!updated.content) {
      updated.content = content;
    }

    dispatch(upsertComment({ postId, comment: updated }));
    return { postId, comment: updated };
  } catch (e) {
    return rejectWithValue("Network error");
  }
});
