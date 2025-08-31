import { useState } from "react";

export function useChangePassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setMessage(null);
    try {
      const res = await fetch("/api/me/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.message || "Change password error");
        setMessage(data?.message || null);
        throw new Error(data?.message || "Change password error");
      }
      setSuccess(true);
      setMessage(data?.message || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Change password error");
    } finally {
      setIsLoading(false);
    }
  };

  return { changePassword, isLoading, error, success, message };
}
