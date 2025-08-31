import { useState } from "react";
import { useAppDispatch } from "../../../shared/lib/hooks/storeHooks";
import { logout } from "../../../entities/user/model/slice";
import { useNavigate } from "react-router-dom";

export function useDeleteMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteMe = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/me", {
        method: "DELETE",
        headers: { accept: "application/json" },
        credentials: "include",
      });
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
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete account error");
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteMe, isLoading, error };
}
