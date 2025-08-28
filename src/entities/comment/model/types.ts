import type { User } from "../../user/model/types";

export type Comment = {
  id: string;
  content: string;
  user?: User;
};
