import { useAskQuestion } from "../../features/question/model/useAskQuestion";
import QuestionForm from "../../widgets/QuestionForm/ui/QuestionForm";

import "./NewQuestionPage.scss";

const NewQuestionPage = () => {
  const { askQuestion, isLoading, error, success } = useAskQuestion();

  return (
    <div className="new-question-page">
      <div className="new-question-page__container">
        <h1 className="new-question-page__title title title--big title--center">Ask you question</h1>
        <QuestionForm isLoading={isLoading} onSubmit={askQuestion} error={error} success={success} />
      </div>
    </div>
  );
};

export default NewQuestionPage;
