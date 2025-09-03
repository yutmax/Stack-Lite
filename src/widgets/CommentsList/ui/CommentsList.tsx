import { Button, TextField } from "@mui/material";
import "./CommentsList.scss";
import type { Comment } from "../../../entities/comment/model/types";
import CommentItem from "../../../entities/comment/ui/CommentItem";
import EmptyState from "../../../shared/ui/EmptyState/EmptyState";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSocket } from "../../../shared/api/socket";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../../entities/user/model/selectors";
import ErrorMessage from "../../../shared/ui/ErrorMessage/ErrorMessage";

interface CommentsListProps {
  comments: Comment[];
}

const CommentsList = ({ comments }: CommentsListProps) => {
  const { id: postId = "" } = useParams();
  const user = useAppSelector(selectUser);
  const [comment, setComment] = useState("");
  const [items, setItems] = useState<Comment[]>(comments);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const socketRef = useRef<ReturnType<typeof getSocket> | null>(null);

  useEffect(() => {
    setItems((prev) => {
      const ids = new Set(prev.map((c) => c.id));
      const merged = [...prev];
      comments.forEach((c) => {
        if (!ids.has(c.id)) merged.push(c);
      });
      return merged;
    });
  }, [comments]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleSend = useCallback(async () => {
    const content = comment.trim();
    if (!content || !postId || sending) return;
    setSending(true);
    setSendError(null);
    const tempId = `temp-${Date.now()}`;
    const optimisticUser = user && user.id != null ? { id: user.id, username: user.username, role: (user as any).role } : undefined;
    const optimistic: Comment = { id: tempId, content, user: optimisticUser as any };
    setItems((prev) => [...prev, optimistic]);
    setComment("");

    const socket = socketRef.current;
    if (socket && socket.connected) {
      let ackTimeout: number | undefined;
      const clearAckTimeout = () => {
        if (ackTimeout) window.clearTimeout(ackTimeout);
      };
      try {
        socket.emit("comment:add", { postId: Number(postId), content, tempId }, (serverComment?: any, errorMsg?: string) => {
          clearAckTimeout();
          if (errorMsg) {
            setSendError(errorMsg);
            setItems((prev) => prev.filter((c) => c.id !== tempId));
            setComment(content);
            setSending(false);
            return;
          }
          if (serverComment && serverComment.id) {
            setItems((prev) => {
              const idx = prev.findIndex((c) => c.id === tempId);
              if (idx !== -1) {
                const copy = [...prev];
                copy[idx] = serverComment;
                return copy;
              }
              if (prev.some((c) => c.id === serverComment.id)) return prev;
              return [...prev, serverComment];
            });
          }
          setSending(false);
        });

        ackTimeout = window.setTimeout(async () => {
          try {
            const res = await fetch("/api/comments", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ content, snippetId: Number(postId) }),
            });
            if (res.ok) {
              const json = await res.json().catch(() => null as any);
              const data = (json as any)?.data?.data ?? (json as any)?.data ?? json;
              if (data && data.id) {
                setItems((prev) => {
                  const idx = prev.findIndex((c) => c.id === tempId);
                  if (idx !== -1) {
                    const copy = [...prev];
                    copy[idx] = data;
                    return copy;
                  }
                  if (prev.some((c) => c.id === data.id)) return prev;
                  return [...prev, data];
                });
              }
            } else {
              setItems((prev) => prev.filter((c) => c.id !== tempId));
              setComment(content);
            }
          } finally {
            setSending(false);
          }
        }, 4000);
      } catch (err) {
        clearAckTimeout();
        setItems((prev) => prev.filter((c) => c.id !== tempId));
        setComment(content);
        setSendError(err instanceof Error ? err.message : "Send error");
        setSending(false);
      }
      return;
    }

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, snippetId: Number(postId) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json().catch(() => null as any);
      const data = (json as any)?.data?.data ?? (json as any)?.data ?? json;
      if (data && data.id) {
        setItems((prev) => {
          const idx = prev.findIndex((c) => c.id === tempId);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = data;
            return copy;
          }
          if (prev.some((c) => c.id === data.id)) return prev;
          return [...prev, data];
        });
      } else {
        setItems((prev) => prev.filter((c) => c.id !== tempId));
        setComment(content);
      }
    } catch (e) {
      setSendError(e instanceof Error ? e.message : "Send error");
      setItems((prev) => prev.filter((c) => c.id !== tempId));
      setComment(content);
    } finally {
      setSending(false);
    }
  }, [comment, postId, user, sending]);

  useEffect(() => {
    if (!postId) return;
    const socket = getSocket();
    socketRef.current = socket;
    socket.emit("post:join", { postId });
    const onAdded = (payload: { postId: string; comment: Comment; tempId?: string }) => {
      if (payload.postId !== postId) return;
      setItems((prev) => {
        if (payload.tempId) {
          const idx = prev.findIndex((c) => c.id === payload.tempId);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = payload.comment;
            return copy;
          }
        }
        if (prev.some((c) => c.id === payload.comment.id)) return prev;
        return [...prev, payload.comment];
      });
    };
    socket.on("comment:added", onAdded);
    return () => {
      socket.emit("post:leave", { postId });
      socket.off("comment:added", onAdded);
    };
  }, [postId]);

  return (
    <div className="comments-list">
      <h3 className="comments-list__title title">Comments</h3>

      <div className="comments-list__add-comment">
        <TextField value={comment} onChange={handleCommentChange} fullWidth placeholder="Write a comment..." />
        <Button disabled={!comment.trim() || sending} onClick={handleSend}>
          Send
        </Button>
      </div>
      {sendError && <ErrorMessage message={sendError} />}

      <ul className="comments-list__list">
        {items.length === 0 ? (
          <EmptyState message="No comments yet" />
        ) : (
          items.map((c) => (
            <li className="comments-list__item" key={c.id}>
              <CommentItem comment={c} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CommentsList;
