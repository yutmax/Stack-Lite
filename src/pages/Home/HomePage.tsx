import { useSelector } from "react-redux";
import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import { selectUser } from "../../entities/user/model/selectors";
import PostList from "../../widgets/PostList/ui/PostList";
import { useState } from "react";
import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import Spinner from "../../shared/ui/Spinner/Spinner";
import { usePosts } from "../../features/post/model/usePosts";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts, meta, loading, error } = usePosts(currentPage, 10);

  const user = useSelector(selectUser);
  const username = user?.username || "stranger";

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="home-page">
      <div className="home-page__container">
        <WelcomeBanner username={username} />
        {loading ? (
          <Spinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <>
            <PostList posts={posts} title="Interesting posts for you" />
            <PaginationControl page={currentPage} loading={loading} totalPages={meta?.totalPages} changePage={handleChangePage} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
