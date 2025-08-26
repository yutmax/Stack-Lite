import { CircularProgress } from "@mui/material";
import { useState } from "react";

import "./PostList.scss";
import PostCard from "../../../entities/post/ui/PostCard";

const PostList = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className=" post-cards">
      <h3 className="post-cards__title">Interesting posts for you</h3>
      <ul className="post-cards__list">
        {loading && <CircularProgress />}
        {/* {snippets.map((snippet) => (
          <>
            <li key={snippet.id}>
              <pre>{snippet.code}</pre>
              <div>Language: {snippet.language}</div>
              <div>Author: {snippet.user.username}</div>
              <div>Likes: {snippet.marks.filter((m) => m.type === "like").length}</div>
              <div>Dislikes: {snippet.marks.filter((m) => m.type === "dislike").length}</div>
              <div>Comments: {snippet.comments.length}</div>
            </li>
            <br />
          </>
        ))} */}

        <li>
          <PostCard />
        </li>
        <li>
          <PostCard />
        </li>
        <li>
          <PostCard />
        </li>
      </ul>
    </div>
  );
};

export default PostList;
