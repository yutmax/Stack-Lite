import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Question } from "../../../features/question/types";

import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./QuestionItem.scss";
import AnswerseAccordion from "../../../widgets/AnswersAccordion/ui/AnswerseAccordion";
import { useSelector } from "react-redux";
import { selectUser } from "../../user/model/selectors";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { deleteQuestion } from "../../../features/question/model/deleteQuestion";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";
import SuccessMessage from "../../../widgets/SuccessMessage/ui/SuccessMessage";
import { useNavigate } from "react-router-dom";

interface QuestionItemProps {
  question: Question;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  const user = useSelector(selectUser);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const navigate = useNavigate();

  const isOwner = user?.id === question.user.id;

  const handleDelete = async () => {
    setDeleting(true);
    setDeleteError(null);
    const result = await deleteQuestion(question.id);
    setDeleting(false);
    if (result.success) {
      setDeleteSuccess(true);
    } else {
      setDeleteError(result.error || "Failed to delete the question.");
    }
  };

  const handleCommentChange = () => {
    navigate(`/questions/${question.id}`);
  };
  return (
    <div className="question-item">
      <div className="question-item__header">
        <div className="question-item__icon">{question.isResolved ? <CheckCircleIcon color="success" /> : <HelpCenterIcon color="primary" />}</div>
        <div className="question-item__info">
          <h4 className="question-item__title title">{question.title}</h4>
          <p className="question-item__asked-by">Asked by: {question.user.username}</p>
        </div>
      </div>
      <div className="question-item__description">
        <span>Description:</span> {question.description}
      </div>
      <div className="question-item__attached">
        {question.attachedCode && (
          <SyntaxHighlighter
            customStyle={{
              margin: 0,
              padding: "12px 16px",
              fontSize: "14px",
              background: "transparent",
            }}
            wrapLongLines={false}
          >
            {question.attachedCode}
          </SyntaxHighlighter>
        )}
      </div>
      {isOwner && (
        <div className="question-item__owner-note">
          <IconButton onClick={handleCommentChange} size="small" color="primary">
            <EditIcon />
          </IconButton>
          <IconButton loading={deleting} disabled={deleteSuccess} onClick={handleDelete} size="small">
            <DeleteIcon color="error" />
          </IconButton>
        </div>
      )}
      {deleteError && <ErrorMessage message={deleteError} />}
      {deleteSuccess && <SuccessMessage message="Question deleted successfully." />}
      {question.answers.length > 0 && <AnswerseAccordion answers={question.answers} />}
    </div>
  );
};

export default QuestionItem;
