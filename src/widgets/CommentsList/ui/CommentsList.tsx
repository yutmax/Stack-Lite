import { Button, TextField } from "@mui/material";
import "./CommentsList.scss";
import type { Comment } from "../../../entities/comment/model/types";
import CommentItem from "../../../entities/comment/ui/CommentItem";
import EmptyState from "../../../shared/ui/EmptyState/EmptyState";

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  return (
    <div className="comments-list">
      <h3 className="comments-list__title title">Comments</h3>

      <div className="comments-list__add-comment">
        <TextField fullWidth placeholder="Write a comment..." />
        <Button>Send</Button>
      </div>

      <ul className="comments-list__list">
        {comments.length === 0 ? (
          <EmptyState message="No comments yet" />
        ) : (
          comments.map((comment) => (
            <li className="comments-list__item">
              <CommentItem comment={comment} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
