import Stat from "./Stat/Stat";
import { IconButton } from "@mui/material";

import "./UserStats.scss";

import personAvatar from "../../../shared/assets/img/avatar.png";

import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";

const UserStats = () => {
  return (
    <div className="user-stats">
      <div className="user-stats__header">
        <div className="user-stats__awatar-wrapper">
          <img src={personAvatar} alt="Avatar" />
        </div>
        <div className="user-stats__person">
          <div className="user-stats__username">someUser</div>
          <div className="user-stats__role">Role: user</div>
          <div className="user-stats__id">ID: 142</div>
        </div>
      </div>
      <div className="user-stats__divider" />
      <div className="user-stats__items">
        <Stat value={1} label="raiting" />
        <Stat value={1} label="raiting" />
        <Stat value={1} label="raiting" />
        <Stat value={1} label="raiting" />
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
