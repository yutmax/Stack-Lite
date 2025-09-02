import { useState } from "react";

export function useDeleteSnippet() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteSnippet = async (id: number | string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/snippets/${id}`, {
        method: "DELETE",
        headers: { accept: "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        let msg = `HTTP error ${res.status}`;
        try {
          const data = await res.json();
          msg = data?.message || msg;
        } catch {}
        throw new Error(msg);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteSnippet, loading, error };
}
