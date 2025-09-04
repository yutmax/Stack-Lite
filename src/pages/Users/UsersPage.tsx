import UserTable from "../../widgets/UserList/ui/UserTable";

import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";
import { useUsers } from "../../features/users/model/useUsers";

import "./UsersPage.scss";
import Spinner from "../../shared/ui/Spinner/Spinner";

const UsersPage = () => {
  const { users, loading, currentPage, handleChangePage, meta } = useUsers();

  return (
    <div className="users-page">
      <div className="users-page__container">
        <h2 className="users-page__title title title--big title--center">All Stack Lite users</h2>

        {loading ? (
          <Spinner />
        ) : (
          <>
            <UserTable users={users} />
            <div className="users-page__pagination">
              <PaginationControl page={currentPage} changePage={handleChangePage} loading={loading} totalPages={meta?.totalPages} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
