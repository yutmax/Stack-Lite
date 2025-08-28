import { Pagination } from "@mui/material";
import { useCallback } from "react";
import { usePostPagination } from "../model/usePostPagination";

interface PostPaginationProps {
  size?: "small" | "medium" | "large";
  className?: string;
}

export const PostPagination = ({ size = "small", className = "" }: PostPaginationProps) => {
  const { page, totalPages, loading, changePage } = usePostPagination();

  const handleChange = useCallback(
    (_: React.ChangeEvent<unknown>, value: number) => {
      changePage(value);
    },
    [changePage]
  );

  if (totalPages <= 1) return null;

  return <Pagination className={className} count={totalPages} page={page} onChange={handleChange} size={size} disabled={!!loading} />;
};
