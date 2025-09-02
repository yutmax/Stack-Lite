// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/storeHooks";
// import { fetchPostById } from "../../entities/post/model/fetchPostById";
// import PostCard from "../../entities/post/ui/PostCard";
// import { usePostCommentsSocket } from "../../features/post/comments/model/usePostCommentsSocket";
// import CommentItem from "../../entities/comment/ui/CommentItem";

import "./PostPage.scss";
// import { Button, TextField } from "@mui/material";
// import { deleteComment } from "../../features/post/comments/model/deleteComment";
// import CommentEditModal from "../../features/post/comments/ui/CommentEditModal";
// import { updateComment } from "../../features/post/comments/model/updateComment";

const PostPage = () => {
  // const { id = "" } = useParams();
  // const dispatch = useAppDispatch();
  // const post = useAppSelector((s) => s.posts.posts.find((p) => p.id === id));
  // const [commentValue, setCommentValue] = useState("");
  // const { sendComment } = usePostCommentsSocket(id);
  // const [editingComment, setEditingComment] = useState<null | { id: string; content: string }>(null);
  // const [editLoading, setEditLoading] = useState(false);
  // const [editError, setEditError] = useState<string | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     dispatch(fetchPostById({ id }));
  //   }
  // }, [id, dispatch]);

  // const handleSend = () => {
  //   if (!commentValue.trim()) return;
  //   sendComment(commentValue.trim());
  //   setCommentValue("");
  // };

  // const onDeleteComment = (commentId: string) => {
  //   dispatch(deleteComment({ id: commentId, postId: id }));
  // };

  // const onEditComment = (comment: { id: string; content: string }) => {
  //   setEditingComment(comment);
  //   setEditError(null);
  // };

  // const handleSaveEdit = async (content: string) => {
  //   if (!editingComment) return;
  //   setEditLoading(true);
  //   setEditError(null);
  //   const result = await dispatch(updateComment({ id: editingComment.id, postId: id, content }));
  //   if (updateComment.rejected.match(result)) {
  //     setEditError(result.payload || "Update failed");
  //   } else {
  //     setEditingComment(null);
  //   }
  //   setEditLoading(false);
  // };

  return (
    <div className="post-page">
      {/* <div className="post-page__container" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {post && <PostCard post={post} />}
        <div className="post-page__comments" style={{ marginTop: 24 }}>
          <h3 className="post-page__title">Comments</h3>

          <div className="post-page__add-comment">
            <TextField fullWidth value={commentValue} onChange={(e) => setCommentValue(e.target.value)} placeholder="Write a comment..." />
            <Button onClick={handleSend}>Send</Button>
          </div>

          <ul className="post-page__comments-list">
            {post?.comments.map((comment) => (
              <li key={comment.id} className="post-page__comment-item">
                <CommentItem comment={comment} onDelete={() => onDeleteComment(comment.id)} onEdit={() => onEditComment(comment)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <CommentEditModal open={!!editingComment} comment={editingComment as any} onClose={() => (!editLoading ? setEditingComment(null) : null)} onSave={handleSaveEdit} loading={editLoading} error={editError} /> */}
    </div>
  );
};

export default PostPage;
