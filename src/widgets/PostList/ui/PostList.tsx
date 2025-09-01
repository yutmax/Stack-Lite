import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import PostCard from "../../../entities/post/ui/PostCard";
import { selectPosts, selectPostsError, selectPostsLoading, selectPostsMeta, selectPostsCurrentFilterUserId } from "../../../entities/post/model/selectors";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { fetchPosts } from "../../../entities/post/model/fetchPosts";
import { PostPagination } from "../../../features/post/pagination";

import "./PostList.scss";

interface PostListProps {
  userId?: number | null;
}

const PostList = ({ userId }: PostListProps) => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const loading = useAppSelector(selectPostsLoading);
  const error = useAppSelector(selectPostsError);
  const meta = useAppSelector(selectPostsMeta);
  const currentFilterUserId = useAppSelector(selectPostsCurrentFilterUserId);

  const hasAny = posts.length > 0;

  useEffect(() => {
    if (loading) return;
    // If filter changed (e.g., user view -> global or one user -> another user) always refetch page 1
    const filterChanged = (currentFilterUserId ?? null) !== (userId ?? null);
    if (filterChanged) {
      dispatch(fetchPosts({ page: 1, limit: meta.itemsPerPage, userId: userId ?? undefined }));
      return;
    }
    if (!hasAny) {
      dispatch(fetchPosts({ page: 1, limit: meta.itemsPerPage, userId }));
    }
  }, [dispatch, loading, hasAny, meta.itemsPerPage, userId, currentFilterUserId]);

  return (
    <div className=" post-cards">
      <h3 className="post-cards__title">{userId ? "My snippets" : "Interesting posts for you"}</h3>
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

      <div className="post-cards__pagination">
        <PostPagination userId={userId} />
      </div>
    </div>
  );
};

export default PostList;
