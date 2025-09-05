import { Button, TextField } from "@mui/material";
import CodeEditor from "../../../shared/ui/CodeEditor/CodeEditor";
import { useEffect, useState } from "react";

import "./QuestionForm.scss";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../SuccessMessage/ui/SuccessMessage";
import type { Question } from "../../../features/question/types";

interface QuestionFormProps {
  onSubmit?: (data: { title: string; description: string; attachedCode: string }) => void;
  isLoading?: boolean;
  error?: string | null;
  success?: boolean | string;
  question?: Question | null;
}

const QuestionForm = ({ onSubmit, isLoading, error, success, question }: QuestionFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    if (question) {
      setTitle(question.title || "");
      setDescription(question.description || "");
      setCode(question.attachedCode || "");
    }
  }, [question]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ title, description, attachedCode: code });
  };

  return (
    <form className="question-form" onSubmit={handleSubmit}>
      <div className="question-form__line">
        <TextField value={title} onChange={handleTitleChange} label="Title" fullWidth />
      </div>
      <div className="question-form__line">
        <TextField value={description} onChange={handleDescriptionChange} label="Description" fullWidth />
      </div>
      <div className="question-form__line">
        <CodeEditor value={code} onChange={setCode} />
      </div>

      <Button loading={isLoading} type="submit" variant="contained" color="primary">
        Submit
      </Button>

      {error && <ErrorMessage message={error} />}
      {success && <SuccessMessage message={typeof success === "string" ? success : "Question submitted successfully!"} />}
    </form>
  );
};

export default QuestionForm;
