import type { Mark } from "../../../features/post/marks/model/types";
import type { User } from "../../user/model/types";

type Comment = {
  id: string;
  content: string;
};

export type Post = {
  id: string;
  code: string;
  language: string;
  marks: Mark[];
  user: User;
  comments: Comment[];
};
