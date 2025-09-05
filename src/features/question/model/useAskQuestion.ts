import { useState } from "react";

export const useAskQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean | string>(false);

  const askQuestion = (data: { title: string; description: string; attachedCode: string }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    fetch("/api/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit question");
        }
        return res.json();
      })
      .then((data) => {
        setSuccess(data.message || true);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { askQuestion, isLoading, error, success };
};
