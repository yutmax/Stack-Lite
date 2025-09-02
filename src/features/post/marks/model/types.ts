import type { User } from "../../../../entities/user/model/types";

export type Mark = {
  id: string;
  type: "like" | "dislike";
  user: User;
};
