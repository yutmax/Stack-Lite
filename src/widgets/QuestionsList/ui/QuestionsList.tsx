import QuestionItem from "../../../entities/question/ui/QuestionItem";
import type { Question } from "../../../features/question/types";

import "./QuestionsList.scss";

interface QuestionsListProps {
  questions: Question[];
}

const QuestionsList = ({ questions }: QuestionsListProps) => {
  return (
    <ul className="questions-list">
      {questions.map((question) => (
        <li className="questions-list__item" key={question.id}>
          <QuestionItem question={question} />
        </li>
      ))}
    </ul>
  );
};

export default QuestionsList;
