import { useParams } from "react-router-dom";
import PostCard from "../../entities/post/ui/PostCard";
import { usePostById } from "../../features/post/model/usePostById";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import CommentsList from "../../widgets/CommentsList/ui/CommentsList";

import "./PostPage.scss";

const PostPage = () => {
  const { id = "" } = useParams();
  const { post, loading, error } = usePostById(Number(id));

  return (
    <div className="post-page">
      <div className="post-page__container">
        {loading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {post && (
          <>
            <PostCard post={post} />
            <CommentsList comments={post.comments} />
          </>
        )}
      </div>
    </div>
  );
};

export default PostPage;
