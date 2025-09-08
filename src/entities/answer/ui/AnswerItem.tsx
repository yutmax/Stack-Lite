import type { Answer } from "../../../features/question/types";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../user/model/selectors";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";

import "./AnswerItem.scss";
import { Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";

interface AnswerItemProps {
  answer: Answer;
  deleteAnswer: (answerId: number | string) => void;
  editAnswer: (answerId: number | string, content: string) => void;
}

const AnswerItem = ({ answer, deleteAnswer, editAnswer }: AnswerItemProps) => {
  const user = useAppSelector(selectUser);
  const isOwner = user?.id === answer.user?.id;

  const [isEdit, setIsEdit] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);

  const handleDelete = () => {
    if (answer.id) {
      deleteAnswer(answer.id);
    }
  };

  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  const handleEditSave = () => {
    if (answer.id) {
      editAnswer(answer.id, editedContent);
      setIsEdit(false);
    }
  };
  return (
    <div className="answer-item">
      <div className="answer-item__header">
        <p className="answer-item__user">
          Answered by: <span>{answer.user && answer.user.username}</span>
        </p>
        <div className="answer-item__status">{answer.isCorrect && <span className="answer-item__correct">Correct Answer</span>}</div>
      </div>
      <div className="answer-item__content">{isEdit ? <TextField label="Edit Answer" onChange={handleEditChange} fullWidth defaultValue={answer.content} variant="outlined" /> : <p>{answer.content}</p>}</div>

      {isOwner && (
        <div className="answer-item__owner-badge">
          <IconButton onClick={toggleEdit} size="small" color="primary">
            {isEdit ? <CancelIcon /> : <EditIcon />}
          </IconButton>
          {isEdit && (
            <Button onClick={handleEditSave} variant="contained" color="primary" size="small" sx={{ textTransform: "none" }}>
              Save
            </Button>
          )}
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default AnswerItem;
