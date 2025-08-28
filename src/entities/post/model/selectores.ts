import type { RootState } from "../../../app/providers/store/store";

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectPostsMeta = (state: RootState) => state.posts.meta;
