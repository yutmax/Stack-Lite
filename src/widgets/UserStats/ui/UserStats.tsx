import Stat from "./Stat/Stat";
import { IconButton } from "@mui/material";

import "./UserStats.scss";

import personAvatar from "../../../shared/assets/img/avatar.png";

import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import type { User } from "../../../entities/user/model/types";

export type Statistic = {
  snippetsCount: number;
  rating: number;
  commentsCount: number;
  likesCount: number;
  dislikesCount: number;
  questionsCount: number;
  correctAnswersCount: number;
  regularAnswersCount: number;
};

interface UserStatsProps {
  userStatistic: {
    user: User;
    statistic: Statistic;
  } | null;
}

const UserStats = ({ userStatistic }: UserStatsProps) => {
  if (!userStatistic) return null;
  return (
    <div className="user-stats">
      <div className="user-stats__header">
        <div className="user-stats__awatar-wrapper">
          <img src={personAvatar} alt="Avatar" />
        </div>
        <div className="user-stats__person">
          <div className="user-stats__username">{userStatistic.user.username}</div>
          <div className="user-stats__role">Role: {userStatistic.user.role}</div>
          <div className="user-stats__id">ID: {userStatistic.user.id}</div>
        </div>
      </div>
      <div className="user-stats__divider" />
      <div className="user-stats__items">
        <Stat value={userStatistic.statistic.rating} label="raiting" />
        <Stat value={userStatistic.statistic.snippetsCount} label="snippets" />
        <Stat value={userStatistic.statistic.commentsCount} label="comments" />
        <Stat value={userStatistic.statistic.likesCount} label="likes" />
        <Stat value={userStatistic.statistic.dislikesCount} label="dislikes" />
        <Stat value={userStatistic.statistic.questionsCount} label="questions" />
        <Stat value={userStatistic.statistic.correctAnswersCount} label="correct answers" />
        <Stat value={userStatistic.statistic.regularAnswersCount} label="regular answers" />
      </div>
      <div className="user-stats__actions">
        <IconButton color="primary">
          <LogoutIcon />
        </IconButton>
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default UserStats;
