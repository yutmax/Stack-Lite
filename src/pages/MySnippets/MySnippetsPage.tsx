import "./MySnippetsPage.scss";

import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import PostList from "../../widgets/PostList/ui/PostList";
import { useAppSelector } from "../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../entities/user/model/selectors";
import { useState } from "react";
import { usePosts } from "../../features/post/model/usePosts";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";

const MySnippetsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const user = useAppSelector(selectUser);
  const { posts, meta, loading, error, setPosts } = usePosts(currentPage, 10, user.id);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number | string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="my-snippets-page">
      <div className="my-snippets-page__container">
        <WelcomeBanner username={user.username} />
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <PostList posts={posts} title="Your posts" onDelete={handleDelete} />
            <PaginationControl page={currentPage} loading={loading} totalPages={meta?.totalPages} changePage={handleChangePage} />
          </>
        )}
      </div>
    </div>
  );
};

export default MySnippetsPage;
