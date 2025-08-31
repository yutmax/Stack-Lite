import { useState } from "react";
import { useAppDispatch } from "../../../shared/lib/hooks/storeHooks";
import { login } from "../../../entities/user/model/slice";

export function useUpdateMe() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const updateMe = async (username: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);
    try {
      const res = await fetch("/api/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username }),
      });
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = {};
      }
      if (!res.ok) {
        let msg = data?.message || `HTTP error! status: ${res.status}`;

        if (data?.errors && Array.isArray(data.errors)) {
          const details = data.errors.map((err: any) => `${err.field}: ${err.failures?.join(", ")}`).join("; ");
          msg += details ? ` (${details})` : "";
        }
        setError(msg);
        throw new Error(msg);
      }
      if (data?.data) {
        dispatch(login(data.data));
      }
      setMessage(data?.message || null);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update error");
    } finally {
      setIsLoading(false);
    }
  };

  return { updateMe, isLoading, error, success, message };
}
