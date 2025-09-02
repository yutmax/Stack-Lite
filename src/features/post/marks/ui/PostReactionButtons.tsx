import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

import { useNavigate } from "react-router-dom";

type PostReactionButtonsProps = {
  postId: string;
  likeCount: number;
  dislikeCount: number;
};

const PostReactionButtons = ({ postId, likeCount, dislikeCount }: PostReactionButtonsProps) => {
  const navigate = useNavigate();

  const currentUserMark: string = "none";

  return (
    <>
      <Button sx={{ color: currentUserMark === "like" ? "#1976d2" : "#626262" }} startIcon={<ThumbUpAltIcon />}>
        {likeCount}
      </Button>
      <Button sx={{ color: currentUserMark === "dislike" ? "#d32f2f" : "#626262" }} startIcon={<ThumbDownAltIcon />}>
        {dislikeCount}
      </Button>
    </>
  );
};

export default PostReactionButtons;
