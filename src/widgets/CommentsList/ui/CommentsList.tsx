import { Button, TextField } from "@mui/material";
import type { Comment } from "../../../entities/comment/model/types";
import CommentItem from "../../../entities/comment/ui/CommentItem";
import EmptyState from "../../../shared/ui/EmptyState/EmptyState";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { useState } from "react";

import "./CommentsList.scss";
import CommentEditModal from "../../../entities/comment/ui/CommentEditModal";

interface CommentsListProps {
  comments: Comment[];
  onSend?: (text: string) => void;
  onDelete?: (commentId: number) => void;
  onEdit?: (commentId: number, content: string) => Promise<void> | void;
  sending?: boolean;
  sendError?: string | null;
  canSend?: boolean;
}

const CommentsList = ({ comments, onSend, onDelete, onEdit, sending = false, sendError = null, canSend = false }: CommentsListProps) => {
  const [value, setValue] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const editingComment = comments.find((c) => Number(c.id) === editingId) || null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSend = () => {
    if (!onSend || !value.trim() || sending) return;
    onSend(value.trim());
    setValue("");
  };

  const handleDelete = (commentId: number) => {
    onDelete?.(commentId);
  };

  const handleEditClick = (comment: Comment) => {
    setEditingId(Number(comment.id));
    setEditModalOpen(true);
    setEditError(null);
  };

  const handleEditSave = async (newContent: string) => {
    if (editingId == null || !onEdit) return;
    setEditLoading(true);
    setEditError(null);
    try {
      await onEdit(editingId, newContent);
      setEditModalOpen(false);
      setEditingId(null);
    } catch (e: any) {
      setEditError(e?.message || "Failed to update");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    if (editLoading) return;
    setEditModalOpen(false);
    setEditingId(null);
    setEditError(null);
  };

  return (
    <div className="comments-list">
      <h3 className="comments-list__title title">Comments</h3>

      {onSend && (
        <div className="comments-list__add-comment">
          <TextField value={value} onChange={handleChange} fullWidth placeholder={canSend ? "Write a comment..." : "Login to comment"} disabled={!canSend || sending} />
          <Button disabled={!canSend || !value.trim() || sending} onClick={handleSend} variant="contained">
            {sending ? "Sending..." : "Send"}
          </Button>
        </div>
      )}

      {sendError && <ErrorMessage message={sendError} />}

      <ul className="comments-list__list">
        {comments.length === 0 ? (
          <EmptyState message="No comments yet" />
        ) : (
          comments.map((comment) => (
            <li className="comments-list__item" key={comment.id}>
              <CommentItem comment={comment} onDelete={handleDelete} onEditClick={() => handleEditClick(comment)} />
            </li>
          ))
        )}
      </ul>

      <CommentEditModal open={editModalOpen} comment={editingComment} onClose={handleEditCancel} onSave={handleEditSave} loading={editLoading} error={editError} />
    </div>
  );
};

export default CommentsList;
