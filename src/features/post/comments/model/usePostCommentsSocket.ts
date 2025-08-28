import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAppDispatch } from "../../../../shared/lib/hooks/storeHooks";
import { addCommentOptimistic, upsertComment } from "../../../../entities/post/model/slice";
import { useAppSelector } from "../../../../shared/lib/hooks/storeHooks";
import { fetchPostById } from "../../../../entities/post/model/fetchPostById";

let socket: Socket | null = null;

export function usePostCommentsSocket(postId: string) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.user);

  useEffect(() => {
    if (!postId) return;
    let pollInterval: number | undefined;

    if (!socket) {
      socket = io("/", { path: "/socket.io", transports: ["websocket", "polling"], autoConnect: true, reconnection: true });
    }

    const join = () => socket?.emit("join_post", { postId });
    if (socket.connected) join();
    else socket.on("connect", join);

    const handler = (payload: { postId: string; comment: any }) => {
      if (payload.postId === postId) {
        dispatch(upsertComment({ postId, comment: payload.comment }));
      }
    };
    socket.on("post_comment", handler);

    pollInterval = window.setInterval(() => {
      dispatch(fetchPostById({ id: postId }));
    }, 5000);

    const visHandler = () => {
      if (document.visibilityState === "visible") {
        dispatch(fetchPostById({ id: postId }));
      }
    };
    document.addEventListener("visibilitychange", visHandler);

    return () => {
      socket?.emit("leave_post", { postId });
      socket?.off("post_comment", handler);
      socket?.off("connect", join);
      if (pollInterval) window.clearInterval(pollInterval);
      document.removeEventListener("visibilitychange", visHandler);
    };
  }, [postId, dispatch]);

  const sendComment = async (content: string) => {
    if (!user.id) return;
    const tempId = `temp-${Date.now()}`;
    dispatch(
      addCommentOptimistic({
        postId,
        comment: {
          id: tempId,
          content,
          user: { id: user.id, username: user.username, role: user.role },
          _optimistic: true,
        },
      })
    );
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, snippetId: Number(postId) }),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const json = await res.json().catch(() => null);
      const realComment = (json as any)?.data?.data ?? (json as any)?.data ?? json;
      if (realComment?.id) {
        dispatch(upsertComment({ postId, comment: realComment, tempId }));
      }
    } catch (e) {
      dispatch(
        upsertComment({
          postId,
          tempId,
          comment: {
            id: tempId,
            content: `(failed) ${content}`,
            user: { id: user.id, username: user.username, role: user.role },
            error: true,
          },
        })
      );
    }
  };

  return { sendComment };
}
