import type { Mark } from "../../../features/post/marks/model/types";
import type { User } from "../../user/model/types";

export type MetaByPost = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  totalPages: number;
  sortBy: [string, "ASC" | "DESC"][];
};

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
