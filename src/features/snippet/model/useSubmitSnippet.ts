import { useState } from "react";

export function useSubmitSnippet() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitSnippet = async (language: string, code: string) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/snippets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
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
    } catch (error) {
      setError(error instanceof Error ? error.message : "Submit error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitSnippet, isSubmitting, error, success };
}
