import type { Answer } from "../../../features/question/types";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../user/model/selectors";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./AnswerItem.scss";
import { IconButton } from "@mui/material";

interface AnswerItemProps {
  answer: Answer;
  deleteAnswer: (answerId: number | string) => void;
}

const AnswerItem = ({ answer, deleteAnswer }: AnswerItemProps) => {
  const user = useAppSelector(selectUser);
  const isOwner = user?.id === answer.user?.id;

  const handleDelete = () => {
    if (answer.id) {
      deleteAnswer(answer.id);
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
      <div className="answer-item__content">{answer.content}</div>

      {isOwner && (
        <div className="answer-item__owner-badge">
          <IconButton size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} size="small">
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default AnswerItem;
