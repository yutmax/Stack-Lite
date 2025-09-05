import { useEffect, useState } from "react";
import type { Question } from "../types";
import type { Meta } from "../../../entities/meta/types";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../../entities/user/model/selectors";

export function useQuestions(page: number, limit = 10, searchQuery = "") {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector(selectUser);

  useEffect(() => {
    setIsLoading(true);
    let url = `/api/questions?page=${page}&limit=${limit}`;
    if (searchQuery) {
      url += `&search=${encodeURIComponent(searchQuery)}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data.data.data);
        setMeta(data.data.meta);
      })
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [page, limit, searchQuery, user]);

  return { questions, meta, isLoading, error };
}
