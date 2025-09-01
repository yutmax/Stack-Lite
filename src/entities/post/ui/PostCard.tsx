import { Button, IconButton } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PostReactionButtons from "../../../features/post/marks/ui/PostReactionButtons";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../user/model/selectors";
import type { Post } from "../model/types";
import { deletePost } from "../model/deletePost";

import "./PostCard.scss";

import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const likeCount = post.marks?.filter((m) => m.type === "like").length ?? 0;
  const dislikeCount = post.marks?.filter((m) => m.type === "dislike").length ?? 0;
  const commentsCount = post.comments?.length ?? 0;

  let isOwner: boolean = false;
  if (user.id === post.user?.id) isOwner = true;

  const handleCommentClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleDeleteClick = () => {
    if (confirm("Delete this snippet?")) {
      dispatch(deletePost({ id: post.id }));
    }
  };

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
          {isOwner && (
            <>
              <IconButton size="small" color="primary" onClick={() => navigate(`/snippet/${post.id}/edit`)}>
                <EditIcon />
              </IconButton>
              <IconButton size="small" onClick={handleDeleteClick}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </div>
        <Button onClick={handleCommentClick} endIcon={<CommentIcon />}>
          {commentsCount}
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
