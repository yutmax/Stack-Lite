import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./fetchPosts";
import { markPost } from "../../../features/post/marks/model/markPost";
import { fetchPostById } from "./fetchPostById";
import { deletePost } from "./deletePost";
import type { MetaByPost, Post } from "./types";

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  meta: MetaByPost;
  listLoaded: boolean;
  currentFilterUserId: number | null;
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
  listLoaded: false,
  currentFilterUserId: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addCommentOptimistic: (state, action) => {
      const { postId, comment } = action.payload as { postId: string; comment: any };
      const p = state.posts.find((x) => x.id === postId);
      if (p) {
        p.comments = [...p.comments, comment];
      }
    },
    upsertComment: (state, action) => {
      const { postId, comment, tempId } = action.payload as { postId: string; comment: any; tempId?: string };
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return;
      const replaceIdx = tempId ? p.comments.findIndex((c: any) => c.id === tempId) : p.comments.findIndex((c: any) => c.id === comment.id);
      if (replaceIdx !== -1) {
        p.comments[replaceIdx] = comment;
      } else {
        if (!p.comments.some((c: any) => c.id === comment.id)) {
          p.comments = [...p.comments, comment];
        }
      }
    },
    removeComment: (state, action) => {
      const { postId, commentId } = action.payload as { postId: string; commentId: string };
      const p = state.posts.find((x) => x.id === postId);
      if (!p) return;
      p.comments = p.comments.filter((c: any) => c.id !== commentId);
    },
  },
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
        state.listLoaded = true;
        const anyAction: any = action;
        state.currentFilterUserId = anyAction.meta?.arg?.userId ?? null;
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
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        const { post } = action.payload;
        const idx = state.posts.findIndex((p) => p.id === post.id);
        if (idx === -1) {
          state.posts.push(post);
        } else {
          state.posts[idx] = post;
        }
      })
      .addCase(deletePost.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.posts = state.posts.filter((p) => p.id !== id);
        state.meta.totalItems = Math.max(0, state.meta.totalItems - 1);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.error = action.payload || "It was not possible to remove";
      });
  },
});

export const { addCommentOptimistic, upsertComment, removeComment } = postsSlice.actions;
export default postsSlice.reducer;
