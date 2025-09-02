import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import PostList from "../../widgets/PostList/ui/PostList";
import { selectUser } from "../../entities/user/model/selectors";
import { useAppSelector } from "../../shared/lib/hooks/storeHooks";
import { useEffect } from "react";

const MyPosts = () => {
  const user = useAppSelector(selectUser);
  useEffect(() => {
    if (!user) {
      throw new Error("User not found");
    }
  });
  return (
    <div className="home-page">
      <div className="home-page__container">
        <WelcomeBanner username={user.username} />
        <PostList />
      </div>
    </div>
  );
};

export default MyPosts;
