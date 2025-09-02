import { useEffect, useState } from "react";
import type { Meta } from "../../../entities/meta/types";
import type { Post } from "../../../entities/post/model/types";

export function usePosts(page: number, limit = 10, userId?: number | null) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    let url = `/api/snippets?page=${page}&limit=${limit}`;
    if (userId) {
      url = `/api/snippets?userId=${userId}&page=${page}&limit=${limit}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data.data);
        setMeta(data.data.meta);
        setLoading(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [page, limit]);

  return { posts, meta, loading, error, setPosts };
}
