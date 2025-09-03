import { useEffect, useState } from "react";
import type { Question } from "../types";
import type { Meta } from "../../../entities/meta/types";

export function useQuestions(page: number, limit = 10) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/questions?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.data.data);
        setMeta(data.data.meta);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [page, limit]);

  return { questions, meta, isLoading, error };
}
