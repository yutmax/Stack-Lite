import { useState } from "react";
import { useAppDispatch } from "../../../shared/lib/hooks/storeHooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../entities/user/model/slice";

export const useLogout = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);
    setError(null);
    fetch("/api/auth/logout", {
      method: "POST",
      headers: { accept: "application/json" },
      credentials: "include",
    })
      .then(async (res) => {
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
      })
      .then(() => {
        dispatch(logout());
        navigate("/login");
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Logout error");
      })
      .finally(() => setLoading(false));
  };

  return { logout: handleLogout, isLoading, error };
};
