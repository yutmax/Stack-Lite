import { Button, TextField } from "@mui/material";
import type { Comment } from "../../../entities/comment/model/types";
import CommentItem from "../../../entities/comment/ui/CommentItem";
import EmptyState from "../../../shared/ui/EmptyState/EmptyState";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";
import { useState } from "react";

import "./CommentsList.scss";

interface CommentsListProps {
  comments: Comment[];
  onSend?: (text: string) => void;
  onDelte?: (commentId: number) => void;
  sending?: boolean;
  sendError?: string | null;
  canSend?: boolean;
}

const CommentsList = ({ comments, onSend, onDelte, sending = false, sendError = null, canSend = false }: CommentsListProps) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  const handleSend = () => {
    if (!onSend || !value.trim() || sending) return;
    onSend(value.trim());
    setValue("");
  };

  const handleDelete = (commentId: number) => {
    if (!onDelte) return;
    onDelte(commentId);
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
          comments.map((c) => (
            <li className="comments-list__item" key={c.id}>
              <CommentItem onDelte={handleDelete} comment={c} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
