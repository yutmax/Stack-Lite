import { useEffect, useState } from "react";
import UserList from "../../widgets/UserList/ui/UserList";
import "./UsersPage.scss";
import { CircularProgress } from "@mui/material";

import type { MetaByPost } from "../../entities/post/model/types";
import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<MetaByPost | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users?page=${currentPage}&limit=15`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data.data);
        setMeta(data.data.meta);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="users-page">
      <div className="users-page__container">
        <h2 className="users-page__title">All Stack Lite users</h2>

        {loading ? <CircularProgress /> : <UserList users={users} />}

        <div className="users-page__pagination">
          <PaginationControl page={currentPage} changePage={handleChangePage} loading={loading} totalPages={meta?.totalPages} />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
