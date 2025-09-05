import { useEffect, useState } from "react";
import type { Question } from "../types";

export function useQuestionById(questionId: string | number) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/questions/${questionId}`)
      .then((res) => res.json())
      .then((data) => setQuestion(data.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [questionId]);

  return { question, isLoading, error };
}
