import { Pagination } from "@mui/material";

import "./PaginationControl.scss";

interface PaginationControlProps {
  totalPages: number | undefined;
  page: number;
  changePage: (nextPage: number) => void;
  loading: boolean;
  size?: "small" | "medium" | "large";
}

const PaginationControl = ({ changePage, loading, page, size = "small", totalPages }: PaginationControlProps) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };
  return (
    <div className="pagination-control">
      <Pagination count={totalPages} page={page} size={size} disabled={!!loading} onChange={handleChange} />
    </div>
  );
};

export default PaginationControl;
