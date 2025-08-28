import { Button } from "@mui/material";
import "./PostCard.scss";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";
import type { Post } from "../model/types";

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
      <div className="post-card__content">. Praesentium quaerat error excepturi impedit totam sapiente eos expedita, sint porro et numquam dicta accusamus mollitia alias velit, vel obcaecati molestiae nemo.</div>
      <div className="post-card__controls">
        <div className="post-card__thumb-acitons">
          <Button sx={{ color: "#626262" }} startIcon={<ThumbUpAltIcon />}>
            {likeCount}
          </Button>
          <Button sx={{ color: "#626262" }} startIcon={<ThumbDownAltIcon />}>
            {dislikeCount}
          </Button>
        </div>
        <Button endIcon={<CommentIcon />}>{commentsCount}</Button>
      </div>
    </div>
  );
};

export default PostCard;
