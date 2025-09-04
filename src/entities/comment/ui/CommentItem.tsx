import { useSelector } from "react-redux";
import type { Comment } from "../model/types";
import { selectUser } from "../../user/model/selectors";
import { IconButton } from "@mui/material";

import "./CommentItem.scss";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentProps {
  comment: Comment;
  onDelete?: (commentId: number) => void;
  onEditClick?: () => void;
}

const CommentItem = ({ comment, onDelete, onEditClick }: CommentProps) => {
  const userId = useSelector(selectUser).id;
  const isOwn = String(comment?.user?.id) === String(userId);

  const handleDelete = () => {
    if (!onDelete) return;
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    onDelete(Number(comment.id));
  };

  return (
    <div className="comment">
      <div className="comment__author">Author: {comment?.user?.username}</div>
      <div className="comment__content">{comment.content}</div>
      {isOwn && (
        <div className="comment__own-badge">
          <IconButton onClick={onEditClick} size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} size="small" color="primary">
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CommentItem;
