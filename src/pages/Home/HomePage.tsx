import { useSelector } from "react-redux";
import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import { selectUser } from "../../entities/user/model/selectors";
import PostList from "../../widgets/PostList/ui/PostList";
import { useEffect, useState } from "react";
import PaginationControl from "../../widgets/Pagination/ui/PaginationControl";
import type { MetaByPost } from "../../entities/post/model/types";

import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";

import Spinner from "../../shared/ui/Spinner/Spinner";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<MetaByPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = useSelector(selectUser);
  const username = user?.username || "stranger";

  useEffect(() => {
    setLoading(true);
    fetch(`/api/snippets?page=${currentPage}&limit=10`)
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data.data);
        setMeta(data.data.meta);
        setLoading(false);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [currentPage]);

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
