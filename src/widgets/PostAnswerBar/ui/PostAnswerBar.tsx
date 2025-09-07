import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface PostAnswerBarProps {
  questionId: number | string;
  refetch: () => void;
}

import "./PostAnswerBar.scss";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../SuccessMessage/ui/SuccessMessage";

const PostAnswerBar = ({ questionId, refetch }: PostAnswerBarProps) => {
  const [answer, setAnswer] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const handlePost = () => {
    const content = answer.trim();
    if (!content || posting) return;

    setPosting(true);
    setError(null);
    setSuccess(false);
    fetch("/api/answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ content, questionId: Number(questionId) }),
    })
      .then((res) => {
        if (res.ok) {
          setAnswer("");
          setSuccess(true);
          refetch();
        } else {
          setError(res.statusText || "Failed to post the answer.");
        }
      })
      .finally(() => {
        setPosting(false);
      });
  };

  return (
    <>
      <div className="post-answer-bar">
        <TextField fullWidth onChange={handleChange} label="Write your answer" />
        <Button loading={posting} onClick={handlePost} size="small" variant="contained" color="primary">
          Post Your Answer
        </Button>
      </div>
      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message="Answer posted successfully." />}
    </>
  );
};

export default PostAnswerBar;
