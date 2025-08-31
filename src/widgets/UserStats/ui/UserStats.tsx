import Stat from "./Stat/Stat";
import { IconButton } from "@mui/material";
import type { User } from "../../../entities/user/model/types";
import { useLogout } from "../../../features/authentication/model/useLogout";
import { useDeleteMe } from "../../../features/authentication/model/useDeleteMe";

import "./UserStats.scss";

import personAvatar from "../../../shared/assets/img/avatar.png";

import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppSelector } from "../../../shared/lib/hooks/storeHooks";
import { selectUser } from "../../../entities/user/model/selectors";

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
  const { logout, isLoading: isLogoutLoading } = useLogout();
  const { deleteMe, isLoading: isDeleting } = useDeleteMe();

  const user = useAppSelector(selectUser);

  if (!userStatistic) return null;
  return (
    <div className="user-stats">
      <div className="user-stats__header">
        <div className="user-stats__awatar-wrapper">
          <img src={personAvatar} alt="Avatar" />
        </div>
        <div className="user-stats__person">
          <div className="user-stats__username">{user.username}</div>
          <div className="user-stats__role">Role: {user.role}</div>
          <div className="user-stats__id">ID: {user.id}</div>
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
        <IconButton loading={isLogoutLoading} onClick={logout} color="primary">
          <LogoutIcon />
        </IconButton>
        <IconButton loading={isDeleting} onClick={deleteMe} color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default UserStats;
