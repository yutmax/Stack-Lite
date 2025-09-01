import { Pagination } from "@mui/material";
import { useCallback } from "react";
import { usePostPagination } from "../model/usePostPagination";

interface PostPaginationProps {
  size?: "small" | "medium" | "large";
  className?: string;
  userId?: number | null;
}

export const PostPagination = ({ size = "small", className = "", userId }: PostPaginationProps) => {
  const { page, totalPages, loading, changePage } = usePostPagination(userId);

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      changePage(value);
    },
    [changePage]
  );

  if (totalPages <= 1) return null;

  return <Pagination className={className} count={totalPages} page={page} onChange={handleChange} size={size} disabled={!!loading} />;
};
