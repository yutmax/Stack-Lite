import { useState } from "react";
import { useQuestions } from "../../features/question/model/useQuestions";
import QuestionsList from "../../widgets/QuestionsList/ui/QuestionsList";
import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import EmptyState from "../../shared/ui/EmptyState/EmptyState";

import "./QuestionPage.scss";

const QuestionsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { questions, meta, isLoading, error } = useQuestions(currentPage, 10);

  const handleChangePage = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  return (
    <div className="question-page">
      <div className="question-page__container">
        <h1 className="question-page__title title title--big title--center">Questions</h1>

        {error && <ErrorMessage message={error} />}
        {isLoading && <Spinner />}
        {questions.length === 0 && !isLoading && !error && <EmptyState message="No questions found." />}
        {questions.length > 0 && !isLoading && (
          <>
            <QuestionsList questions={questions} />
            <PaginationControl changePage={handleChangePage} loading={isLoading} page={currentPage} totalPages={meta?.totalPages} />
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionsPage;
