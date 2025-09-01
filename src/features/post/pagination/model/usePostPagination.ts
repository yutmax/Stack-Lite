import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks/storeHooks";
import { fetchPosts } from "../../../../entities/post/model/fetchPosts";
import { selectPostsLoading, selectPostsMeta, selectPosts } from "../../../../entities/post/model/selectors";

export const usePostPagination = (userId?: number | null) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostsLoading);
  const meta = useAppSelector(selectPostsMeta);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    if (!loading) {
      if (posts.length === 0) {
        dispatch(fetchPosts({ page: meta.currentPage || 1, limit: meta.itemsPerPage, userId }));
      } else {
        if (userId != null) {
          const first = posts[0] as any;
          if (first && String(first.user?.id) !== String(userId)) {
            dispatch(fetchPosts({ page: 1, limit: meta.itemsPerPage, userId }));
          }
        }
      }
    }
  }, [dispatch, loading, posts, meta.currentPage, meta.itemsPerPage, userId]);

  const changePage = useCallback(
    (nextPage: number) => {
      if (loading) return;
      if (nextPage === meta.currentPage) return;
      dispatch(fetchPosts({ page: nextPage, limit: meta.itemsPerPage, userId }));
    },
    [dispatch, loading, meta.currentPage, meta.itemsPerPage, userId]
  );

  return {
    page: meta.currentPage || 1,
    totalPages: meta.totalPages || 0,
    loading,
    changePage,
  };
};
