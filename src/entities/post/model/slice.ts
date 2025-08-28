import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./fetchPosts";
import { markPost } from "../../../features/post/marks/model/markPost";
import type { MetaByPost, Post } from "./types";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  meta: MetaByPost;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
  hasMore: true,
  meta: {
    itemsPerPage: 10,
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
    sortBy: [["createdAt", "DESC"]],
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.items ?? [];
        state.meta = action.payload.meta;
        state.hasMore = action.payload.meta.currentPage < action.payload.meta.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Ошибка загрузки";
      })
      .addCase(markPost.pending, (state, action) => {
        const { id, mark, userId, username, role } = action.meta.arg;
        const idx = state.posts.findIndex((p) => p.id === id);
        if (idx === -1 || !userId) return;
        const oldPost = state.posts[idx];
        const marks = [...oldPost.marks];
        const existingIdx = marks.findIndex((m) => String(m.user.id) === String(userId));
        if (mark === "none") {
          if (existingIdx !== -1) marks.splice(existingIdx, 1);
        } else {
          if (existingIdx !== -1) {
            marks[existingIdx] = { ...marks[existingIdx], type: mark as any };
          } else {
            marks.push({ id: `temp-${Date.now()}`, type: mark as any, user: { id: userId, username: username || "", role: role || "" } as any });
          }
        }
        state.posts[idx] = { ...oldPost, marks };
      })
      .addCase(markPost.fulfilled, (state, action) => {
        const updated = action.payload.post;
        const idx = state.posts.findIndex((p) => p.id === updated.id);
        if (idx !== -1) {
          state.posts[idx] = { ...state.posts[idx], ...updated };
        }
      });
  },
});

export default postsSlice.reducer;
