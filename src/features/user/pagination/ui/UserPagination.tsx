import { Pagination } from "@mui/material";

interface UserPaginationProps {
  totalPages: number | undefined;
  page: number;
  changePage: (nextPage: number) => void;
  loading: boolean;
}

const UserPagination = ({ totalPages, page, changePage, loading }: UserPaginationProps) => {
  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    changePage(value);
  };
  return <Pagination count={totalPages} page={page} onChange={handleChange} size="small" disabled={!!loading} />;
};

export default UserPagination;
