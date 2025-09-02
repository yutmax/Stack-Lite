import { Button, IconButton } from "@mui/material";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import PostReactionButtons from "../../../features/post/marks/ui/PostReactionButtons";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../user/model/selectors";
import type { Post } from "../model/types";
import { useDeleteSnippet } from "../../../features/post/model/useDeleteSnippet";

import "./PostCard.scss";

import CommentIcon from "@mui/icons-material/Comment";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";

type PostCardProps = {
  post: Post;
  onDelete?: (id: number | string) => void;
};

const PostCard = ({ post, onDelete }: PostCardProps) => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const { deleteSnippet, error, loading } = useDeleteSnippet();
  const commentsCount = post.comments?.length ?? 0;

  let isOwner: boolean = false;
  if (user.id === post.user?.id) isOwner = true;

  const handleCommentClick = () => {
    navigate(`/post/${post.id}`);
  };

  const handleEditClick = () => {
    navigate(`/snippet/${post.id}/edit`);
  };

  const handleDeleteClick = async () => {
    if (!window.confirm("Are you sure you want to delete this snippet?")) return;
    try {
      await deleteSnippet(post.id);
      onDelete?.(post.id);
    } catch {}
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
          <PostReactionButtons postId={post.id} marks={post.marks} />
          {isOwner && (
            <>
              <IconButton size="small" color="primary" onClick={handleEditClick}>
                <EditIcon />
              </IconButton>
              <IconButton loading={loading} size="small" onClick={handleDeleteClick}>
                <DeleteIcon color="error" />
              </IconButton>
            </>
          )}
        </div>
        <Button onClick={handleCommentClick} endIcon={<CommentIcon />}>
          {commentsCount}
        </Button>
      </div>

      {error && <ErrorMessage message={error} />}
    </div>
  );
};

export default PostCard;
