import { useState, useEffect } from "react";
import { useAppDispatch } from "../../../shared/lib/hooks/storeHooks";
import { login } from "../../../entities/user/model/slice";

export const useAuth = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch("/api/auth", {
      method: "GET",
      headers: { accept: "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
        if (res.status === 401) {
          return null;
        }

        if (!res.ok) {
          const text = await res.text();
          let message = `HTTP error! status: ${res.status}`;
          try {
            if (text) {
              const errorData = JSON.parse(text);
              message = errorData.message || message;
            }
          } catch {}
          throw new Error(message);
        }
        const text = await res.text();
        if (!text) return null;
        return JSON.parse(text);
      })
      .then((result) => {
        if (result?.data) {
          dispatch(login(result.data));
        }
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Auth error");
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  return { isLoading, error };
};
