import { useParams } from "react-router-dom";
import { useQuestionById } from "../../features/question/model/useQuestionById";
import QuestionForm from "../../widgets/QuestionForm/ui/QuestionForm";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import { useUpdateQuestion } from "../../features/question/model/useUpdateQuestion";

const EditQuestionPage = () => {
  const questionId = useParams().id;
  const { question, error, isLoading } = useQuestionById(questionId!);
  const { updateQuestion, isUpdating, success, error: updateError } = useUpdateQuestion();

  const handleSubmit = (data: { title: string; description: string; attachedCode: string }) => {
    updateQuestion(questionId!, data);
  };

  return (
    <div className="edit-question">
      <div className="edit-question__container">
        {isLoading && <Spinner />}
        {error && <ErrorMessage message={error} />}
        {!isLoading && <QuestionForm question={question} onSubmit={handleSubmit} isLoading={isUpdating} success={success} error={updateError} />}
      </div>
    </div>
  );
};

export default EditQuestionPage;
