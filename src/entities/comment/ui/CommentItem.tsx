import { useSelector } from "react-redux";
import type { Comment } from "../model/types";
import { selectUser } from "../../user/model/selectors";
import { IconButton } from "@mui/material";

import "./CommentItem.scss";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface CommentProps {
  comment: Comment;
  onEdit?: (comment: Comment) => void;
  onDelete?: (comment: Comment) => void;
}

const CommentItem = ({ comment, onDelete, onEdit }: CommentProps) => {
  const userId = useSelector(selectUser).id;
  const isOwn = String(comment?.user?.id) === String(userId);

  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    onEdit?.(comment);
  };
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete?.(comment);
  };
  return (
    <div className="comment">
      <div className="comment__author">Author: {comment?.user?.username}</div>
      <div className="comment__content">{comment.content}</div>
      {isOwn && (
        <div className="comment__own-badge">
          <IconButton onClick={handleEdit} size="small" color="primary">
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
