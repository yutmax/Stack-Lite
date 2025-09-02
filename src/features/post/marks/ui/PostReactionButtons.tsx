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

  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const mark = marks?.find((m) => m.user.id === user.id)?.type || "none";
    setCurrentUserMark(mark);
  }, [marks, user.id]);

  const likeCount = marks?.filter((mark) => mark.type === "like").length ?? 0;
  const dislikeCount = marks?.filter((mark) => mark.type === "dislike").length ?? 0;

  const handleReaction = async (type: "like" | "dislike") => {
    if (!user.isAuth) {
      navigate("/login");
      return;
    }
    const newType = currentUserMark === type ? "none" : type;

    try {
      markPost(Number(postId), newType);
      setCurrentUserMark(newType);
    } catch (err) {
      console.error("Error marking post:", err);
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
