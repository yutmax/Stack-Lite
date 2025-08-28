import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks/storeHooks";
import { fetchPosts } from "../../../../entities/post/model/fetchPosts";
import { selectPostsLoading, selectPostsMeta, selectPosts } from "../../../../entities/post/model/selectors";

export const usePostPagination = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostsLoading);
  const meta = useAppSelector(selectPostsMeta);
  const posts = useAppSelector(selectPosts);

  useEffect(() => {
    if (!loading && posts.length === 0) {
      dispatch(fetchPosts({ page: meta.currentPage || 1, limit: meta.itemsPerPage }));
    }
  }, [dispatch, loading, posts.length, meta.currentPage, meta.itemsPerPage]);

  const changePage = useCallback(
    (nextPage: number) => {
      if (loading) return;
      if (nextPage === meta.currentPage) return;
      dispatch(fetchPosts({ page: nextPage, limit: meta.itemsPerPage }));
    },
    [dispatch, loading, meta.currentPage, meta.itemsPerPage]
  );

  return {
    page: meta.currentPage || 1,
    totalPages: meta.totalPages || 0,
    loading,
    changePage,
  };
};
