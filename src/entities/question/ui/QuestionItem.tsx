import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { Question } from "../../../features/question/types";

import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import "./QuestionItem.scss";
import AnswerseAccordion from "../../../widgets/AnswersAccordion/ui/AnswerseAccordion";

interface QuestionItemProps {
  question: Question;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
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
      {question.answers.length > 0 && <AnswerseAccordion answers={question.answers} />}
    </div>
  );
};

export default QuestionItem;
