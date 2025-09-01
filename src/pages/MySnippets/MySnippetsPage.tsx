import "./MySnippetsPage.scss";

import WelcomeBanner from "../../shared/ui/WelcomeBanner/WelcomeBanner";
import PostList from "../../widgets/PostList/ui/PostList";
import { useAppSelector } from "../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../entities/user/model/selectors";

const MySnippetsPage = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="my-snippets-page">
      <div className="my-snippets-page__container">
        <WelcomeBanner username={user.username} />
        <PostList userId={user.id} />
      </div>
    </div>
  );
};

export default MySnippetsPage;
