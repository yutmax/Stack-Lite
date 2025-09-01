import { useState } from "react";

interface UpdateResult {
  updateSnippet: (id: string, payload: { language?: string; code?: string }) => Promise<void>;
  isUpdating: boolean;
  error: string | null;
  success: boolean;
}

export function useUpdateSnippet(): UpdateResult {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSnippet = async (id: string, payload: { language?: string; code?: string }) => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch(`/api/snippets/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const text = await res.text();
        let message = `HTTP error ${res.status}`;
        try {
          const json = text ? JSON.parse(text) : {};
          message = json.message || message;
        } catch {}
        throw new Error(message);
      }
      setSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update error");
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateSnippet, isUpdating, error, success };
}
