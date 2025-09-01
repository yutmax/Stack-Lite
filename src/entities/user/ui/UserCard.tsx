import { NavLink } from "react-router-dom";
import type { User } from "../model/types";

import "./UserCard.scss";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="user-card">
      <NavLink to={`/user/${user.id}`} className="user-card__link">
        <span>Username: {user.username}</span> <span>Role: {user.role}</span> <span>ID:{user.id}</span>
      </NavLink>
    </div>
  );
};

export default UserCard;
