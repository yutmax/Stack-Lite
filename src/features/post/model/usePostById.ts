import { useEffect, useState } from "react";
import type { Post } from "../../../entities/post/model/types";

export function usePostById(postId: number) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    setLoading(true);
    setError(null);
    fetch(`/api/snippets/${postId}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data.data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [postId]);

  return { post, loading, error };
}
