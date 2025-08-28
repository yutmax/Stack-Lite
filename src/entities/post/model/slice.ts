import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./fetchPosts";
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
      });
  },
});

export default postsSlice.reducer;
