import type { Comment } from "../model/types";
import "./CommentItem.scss";

interface CommentProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentProps) => {
  return (
    <div className="comment">
      <div className="comment__author">Author: {comment?.user?.username}</div>
      <div className="comment__content">{comment.content}</div>
    </div>
  );
};

export default CommentItem;
