import { useCallback, useEffect, useState } from "react";
import type { Answer } from "../../question/types";

export function useAnswers(questionId?: number | string, isResolved?: boolean) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnswers = useCallback(() => {
    if (!questionId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/answers?questionId=${questionId}`)
      .then((res) => res.json())
      .then((data) => {
        let list: Answer[] = data.data ?? [];
        if (isResolved) {
          list = [...list.filter((a) => a.isCorrect), ...list.filter((a) => !a.isCorrect)];
        }
        setAnswers(list);
      })
      .catch((err) => setError(err.message || "Failed to load answers"))
      .finally(() => setLoading(false));
  }, [questionId, isResolved]);

  const deleteAnswer = useCallback((answerId: number | string) => {
    setLoading(true);
    setError(null);
    fetch(`/api/answers/${answerId}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAnswers((prev) => prev.filter((answer) => answer.id !== answerId));
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to delete answer");
      })
      .finally(() => setLoading(false));
  }, []);

  const editAnswer = useCallback((answerId: number | string, content: string) => {
    setLoading(true);
    setError(null);
    fetch(`/api/answers/${answerId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          setAnswers((prev) => prev.map((answer) => (answer.id === answerId ? { ...answer, content } : answer)));
        }
      })
      .catch((err) => {
        setError(err.message || "Failed to edit answer");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const markAsCorrect = useCallback(
    (answerId: number | string, status: "correct" | "incorrect") => {
      setLoading(true);
      setError(null);
      fetch(`/api/answers/${answerId}/state/${status}`, {
        method: "PUT",
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            fetchAnswers();
          }
        })
        .catch((err) => {
          setError(err.message || "Failed to update answer status");
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [fetchAnswers]
  );

  useEffect(() => {
    fetchAnswers();
  }, [fetchAnswers]);

  return {
    answers,
    loading,
    error,
    deleteAnswer,
    refetch: fetchAnswers,
    editAnswer,
    markAsCorrect,
  };
}
