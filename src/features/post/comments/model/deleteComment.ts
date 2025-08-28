import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeComment } from "../../../../entities/post/model/slice";
import type { RootState, AppDispatch } from "../../../../app/providers/store/store";

export const deleteComment = createAsyncThunk<{ id: string; postId: string }, { id: string; postId: string }, { state: RootState; dispatch: AppDispatch; rejectValue: string }>("comments/deleteComment", async ({ id, postId }, { dispatch, rejectWithValue }) => {
  dispatch(removeComment({ postId, commentId: id }));
  try {
    const res = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      return rejectWithValue("Failed to delete comment");
    }
    return { id, postId };
  } catch (e) {
    return rejectWithValue("Network error");
  }
});
