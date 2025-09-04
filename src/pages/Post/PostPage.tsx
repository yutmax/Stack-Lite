import { useParams } from "react-router-dom";
import PostCard from "../../entities/post/ui/PostCard";
import { usePostById } from "../../features/post/model/usePostById";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import CommentsList from "../../widgets/CommentsList/ui/CommentsList";

import "./PostPage.scss";
import { useAppSelector } from "../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../entities/user/model/selectors";
import { useCommentsRealtime } from "../../features/post/comments/useCommentsRealtime";

const PostPage = () => {
  const { id = "" } = useParams();
  const { post, loading, error } = usePostById(Number(id));

  const userState = useAppSelector(selectUser);

  const currentUser =
    userState.id !== null
      ? {
          id: userState.id,
          username: userState.username ?? "unknown",
          role: userState.role ?? "user",
        }
      : undefined;
  const { comments, sendComment, sending, sendError, refreshComments } = useCommentsRealtime(post?.id, (post?.comments as any) || [], currentUser);

  const deleteComment = (commentId: number) => {
    fetch(`/api/comments/${commentId}`, { method: "DELETE", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete comment");
      })
      .catch((err) => {
        console.error(err);
        throw err;
      })
      .finally(() => {
        refreshComments();
      });
  };

  return (
    <div className="post-page">
      <div className="post-page__container">
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {post && (
          <>
            <PostCard post={post} />
            <CommentsList comments={comments} onDelte={deleteComment} onSend={sendComment} sending={sending} sendError={sendError} canSend={!!currentUser} />
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
