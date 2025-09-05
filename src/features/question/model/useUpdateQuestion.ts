import { useState } from "react";

export function useUpdateQuestion() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | boolean>(false);

  const updateQuestion = (questionId: string | number, data: { title: string; description: string; attachedCode?: string }) => {
    setIsUpdating(true);
    setError(null);
    setSuccess(false);

    fetch(`/api/questions/${questionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed with status ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setSuccess(data.message || "Question updated successfully.");
      })
      .catch((err) => {
        setError(err.message || "Network error");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return { updateQuestion, isUpdating, error, success };
}
