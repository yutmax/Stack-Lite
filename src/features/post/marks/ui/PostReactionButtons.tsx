import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Mark } from "../model/types";
import { useAppSelector } from "../../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../../../entities/user/model/selectors";
import { markPost } from "../model/markPost";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

type PostReactionButtonsProps = {
  postId: string;
  marks: Mark[];
};

const PostReactionButtons = ({ postId, marks }: PostReactionButtonsProps) => {
  const [currentUserMark, setCurrentUserMark] = useState<"like" | "dislike" | "none">("none");
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const mark = marks?.find((m) => m.user.id === user.id)?.type || "none";
    setCurrentUserMark(mark);

    setLikeCount(marks?.filter((m) => m.type === "like").length || 0);
    setDislikeCount(marks?.filter((m) => m.type === "dislike").length || 0);
  }, [marks, user.id]);

  const handleReaction = async (type: "like" | "dislike") => {
    if (!user.isAuth) {
      navigate("/login");
      return;
    }
    const newType = currentUserMark === type ? "none" : type;

    let newLikeCount = likeCount;
    let newDislikeCount = dislikeCount;

    if (currentUserMark === "like") newLikeCount -= 1;
    if (currentUserMark === "dislike") newDislikeCount -= 1;
    if (newType === "like") newLikeCount += 1;
    if (newType === "dislike") newDislikeCount += 1;

    setCurrentUserMark(newType);
    setLikeCount(newLikeCount);
    setDislikeCount(newDislikeCount);

    try {
      await markPost(Number(postId), newType);
    } catch (err) {
      console.error("Error marking post:", err);

      setCurrentUserMark(currentUserMark);
      setLikeCount(likeCount);
      setDislikeCount(dislikeCount);
    }
  };

  return (
    <>
      <Button sx={{ color: currentUserMark === "like" ? "#1976d2" : "#626262" }} startIcon={<ThumbUpAltIcon />} onClick={() => handleReaction("like")}>
        {likeCount}
      </Button>
      <Button sx={{ color: currentUserMark === "dislike" ? "#d32f2f" : "#626262" }} startIcon={<ThumbDownAltIcon />} onClick={() => handleReaction("dislike")}>
        {dislikeCount}
      </Button>
    </>
  );
};

export default PostReactionButtons;
