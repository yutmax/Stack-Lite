import type { User } from "../../../entities/user/model/types";

export type Answer = {
  id: number | string;
  content: string;
  isCorrect: boolean;
  user?: User;
};

export type Question = {
  id: number | string;
  title: string;
  description: string;
  attachedCode?: string;
  answers: Answer[];
  user: User;
  isResolved: boolean;
};
