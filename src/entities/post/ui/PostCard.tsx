import { Button } from "@mui/material";
import "./PostCard.scss";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CommentIcon from "@mui/icons-material/Comment";

const PostCard = () => {
  return (
    <div className="post-card">
      <div className="post-card__header">
        <div className="post-card__author">
          <span>Author:</span> username
        </div>
        <div className="post-card__language">
          <span>Language:</span> JavaScript
        </div>
      </div>
      <div className="post-card__content">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium quaerat error excepturi impedit totam sapiente eos expedita, sint porro et numquam dicta accusamus mollitia alias velit, vel obcaecati molestiae nemo.</div>
      <div className="post-card__controls">
        <div className="post-card__thumb-acitons">
          <Button startIcon={<ThumbUpAltIcon />}>10</Button>
          <Button startIcon={<ThumbDownAltIcon />}>1</Button>
        </div>
        <Button endIcon={<CommentIcon />}>11</Button>
      </div>
    </div>
  );
};

export default PostCard;
