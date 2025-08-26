import { useSelector } from "react-redux";
import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import { selectUser } from "../../entities/user/model/selectores";
import PostList from "../../widgets/PostList/ui/PostList";

const HomePage = () => {
  const user = useSelector(selectUser);
  const username = user?.username || "stranger";

  return (
    <div className="home-page">
      <div className="home-page__container">
        <WelcomeBanner username={username} />
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
