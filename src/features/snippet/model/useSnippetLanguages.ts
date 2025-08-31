import { useEffect, useState } from "react";

export function useSnippetLanguages() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/api/snippets/languages")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const list: string[] = Array.isArray(data?.data) ? data.data : [];
        setLanguages(list);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Load error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { languages, loading, error };
}
