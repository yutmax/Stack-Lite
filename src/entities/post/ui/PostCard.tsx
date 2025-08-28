import { Button } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import type { Post } from "../model/types";

import "./PostCard.scss";

import CommentIcon from "@mui/icons-material/Comment";
import PostReactionButtons from "../../../features/post/marks/ui/PostReactionButtons";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const likeCount = post.marks?.filter((m) => m.type === "like").length ?? 0;
  const dislikeCount = post.marks?.filter((m) => m.type === "dislike").length ?? 0;
  const commentsCount = post.comments?.length ?? 0;

  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__author">
          <span>Author:</span> {post.user?.username || "Unknown"}
        </div>
        <div className="post-card__language">
          <span>Language:</span> {post.language}
        </div>
      </div>

      {post.code && (
        <div className="post-card__content">
          <SyntaxHighlighter
            language={post.language?.toLowerCase() || "javascript"}
            customStyle={{
              margin: 0,
              padding: "12px 16px",
              fontSize: "14px",
              background: "transparent",
            }}
            wrapLongLines={false}
          >
            {post.code}
          </SyntaxHighlighter>
        </div>
      )}

      <div className="post-card__controls">
        <div className="post-card__thumb-actions">
          <PostReactionButtons postId={post.id} likeCount={likeCount} dislikeCount={dislikeCount} />
        </div>
        <Button endIcon={<CommentIcon />}>{commentsCount}</Button>
      </div>
    </div>
  );
};

export default PostCard;
