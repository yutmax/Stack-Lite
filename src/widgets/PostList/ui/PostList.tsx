import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState, useCallback } from "react";

import "./PostList.scss";
import PostCard from "../../../entities/post/ui/PostCard";
import { useSelector } from "react-redux";
import { selectPosts, selectPostsError, selectPostsLoading, selectPostsMeta } from "../../../entities/post/model/selectores";
import { useAppDispatch } from "../../../shared/lib/hooks/storeHooks";
import { fetchPosts } from "../../../entities/post/model/fetchPosts";

const PostList = () => {
  const dispatch = useAppDispatch();

  const posts = useSelector(selectPosts);
  const loading = useSelector(selectPostsLoading);
  const error = useSelector(selectPostsError);
  const meta = useSelector(selectPostsMeta);

  const [page, setPage] = useState(meta.currentPage || 1);

  useEffect(() => {
    dispatch(fetchPosts({ page, limit: meta.itemsPerPage }));
  }, [dispatch, page, meta.itemsPerPage]);

  useEffect(() => {
    if (meta.currentPage !== page) {
      setPage(meta.currentPage);
    }
  }, [meta.currentPage]);

  const handleChangePage = useCallback(
    (_event: React.ChangeEvent<unknown>, value: number) => {
      if (value !== page && !loading) {
        setPage(value);
      }
    },
    [page, loading]
  );

  return (
    <div className=" post-cards">
      <h3 className="post-cards__title">Interesting posts for you</h3>
      <ul className="post-cards__list">
        {loading && <CircularProgress sx={{ justifySelf: "center" }} />}
        {error && <div className="post-cards__error">{error}</div>}

        {!loading &&
          posts.map((post) => (
            <li className="post-cards__item" key={post.id}>
              <PostCard post={post} />
            </li>
          ))}
      </ul>

      {meta.totalPages > 1 && (
        <div className="post-cards__pagination">
          <Pagination count={meta.totalPages} page={page} onChange={handleChangePage} size="small" disabled={loading} />
        </div>
      )}
    </div>
  );
};

export default PostList;
