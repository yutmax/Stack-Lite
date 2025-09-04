import { useCallback, useEffect, useRef, useState } from "react";
import type { Comment } from "../../../entities/comment/model/types";
import type { User } from "../../../entities/user/model/types";

type RealtimeComment = Comment & {
  _optimistic?: boolean;
  error?: boolean;
};

interface Options {
  pollIntervalMs?: number;
}

export function useCommentsRealtime(postId?: number | string, initial: RealtimeComment[] = [], currentUser?: User, opts: Options = {}) {
  const [comments, setComments] = useState<RealtimeComment[]>(initial);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const pollRef = useRef<number | null>(null);

  // Sync initial when post changes
  useEffect(() => {
    if (postId) {
      setComments(initial);
    }
  }, [postId, initial]);

  const loadComments = useCallback(async () => {
    if (!postId) return;
    try {
      const response = await fetch(`/api/snippets/${postId}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const freshComments: RealtimeComment[] = data?.data?.comments || [];

      // Replace server list, keep only optimistic still not confirmed
      setComments((prev) => {
        const optimistic = prev.filter((c) => c._optimistic);
        const dedupOptimistic = optimistic.filter((o) => !freshComments.some((f) => f.id === o.id));
        return [...freshComments, ...dedupOptimistic];
      });

      setIsOnline(true);
    } catch (e) {
      console.error("Failed to load comments:", e);
      setIsOnline(false);
    }
  }, [postId]);

  useEffect(() => {
    if (!postId) return;
    loadComments();

    const interval = opts.pollIntervalMs ?? 5000;
    pollRef.current = window.setInterval(loadComments, interval);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") loadComments();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [postId, opts.pollIntervalMs, loadComments]);

  const sendComment = useCallback(
    async (content: string) => {
      if (!postId || !currentUser || !content.trim()) return;

      setSendError(null);
      const tempId = `temp-${Date.now()}`;
      const optimisticComment: RealtimeComment = {
        id: tempId,
        content,
        user: currentUser,
        _optimistic: true,
      };

      // Add optimistic
      setComments((prev) => [...prev, optimisticComment]);
      setSending(true);

      try {
        const response = await fetch("/api/comments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ content, snippetId: postId }),
          credentials: "include",
        });

        const data = await response.json().catch(() => null);
        if (!response.ok) throw new Error(data?.message || `HTTP ${response.status}`);

        const realComment = data?.data?.data ?? data?.data ?? data;
        if (realComment?.id) {
          setComments((prev) => prev.map((c) => (c.id === tempId ? { ...realComment, user: realComment.user || currentUser } : c)));

          setTimeout(loadComments, 100);
        }
      } catch (e: any) {
        const msg = e instanceof Error ? e.message : "Send failed";
        setSendError(msg);
        setComments((prev) => prev.map((c) => (c.id === tempId ? { ...c, error: true, content: `(Failed) ${content}` } : c)));
      } finally {
        setSending(false);
      }
    },
    [postId, currentUser, loadComments]
  );

  const refreshComments = useCallback(() => {
    loadComments();
  }, [loadComments]);

  return {
    comments,
    sendComment,
    sending,
    sendError,
    isOnline,
    refreshComments,
    setComments,
  };
}
