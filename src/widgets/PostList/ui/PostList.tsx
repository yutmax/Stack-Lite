import type { Post } from "../../../entities/post/model/types";
import PostCard from "../../../entities/post/ui/PostCard";
import EmptyState from "../../../shared/ui/EmptyState/EmptyState";

import "./PostList.scss";

interface PostListProps {
  posts: Post[];
  title: string;
  onDelete?: (id: number | string) => void;
}

const PostList = ({ posts, title, onDelete }: PostListProps) => {
  return (
    <div className=" post-cards">
      <h3 className="post-cards__title title">{title}</h3>
      <ul className="post-cards__list">
        {posts.length === 0 ? (
          <EmptyState message="No posts available." />
        ) : (
          posts.map((post) => (
            <li className="post-cards__item" key={post.id}>
              <PostCard post={post} onDelete={onDelete} />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PostList;
