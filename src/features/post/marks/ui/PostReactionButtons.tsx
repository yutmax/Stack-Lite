import { Button } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { useAppDispatch, useAppSelector } from "../../../../shared/lib/hooks/storeHooks";
import { markPost } from "../model/markPost";
import { useNavigate } from "react-router-dom";

type PostReactionButtonsProps = {
  postId: string;
  likeCount: number;
  dislikeCount: number;
};

const PostReactionButtons = ({ postId, likeCount, dislikeCount }: PostReactionButtonsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.user);
  const userId = user.id;
  const post = useAppSelector((s) => s.posts.posts.find((p) => p.id === postId));
  const currentUserMark = post?.marks.find((m) => String(m.user.id) === String(userId))?.type;

  const handleMark = (type: "like" | "dislike") => {
    if (userId == null) {
      navigate("/login");
      return;
    }
    const send: "like" | "dislike" | "none" = currentUserMark === type ? "none" : type;
    dispatch(markPost({ id: postId, mark: send, userId, username: user.username, role: user.role }));
  };

  return (
    <>
      <Button sx={{ color: currentUserMark === "like" ? "#1976d2" : "#626262" }} startIcon={<ThumbUpAltIcon />} onClick={() => handleMark("like")}>
        {likeCount}
      </Button>
      <Button sx={{ color: currentUserMark === "dislike" ? "#d32f2f" : "#626262" }} startIcon={<ThumbDownAltIcon />} onClick={() => handleMark("dislike")}>
        {dislikeCount}
      </Button>
    </>
  );
};

export default PostReactionButtons;
