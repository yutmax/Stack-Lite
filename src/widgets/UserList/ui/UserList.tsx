import type { User } from "../../../entities/user/model/types";
import UserCard from "../../../entities/user/ui/UserCard";

interface UserListProps {
  users: User[];
}

const UserList = ({ users }: UserListProps) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li className="user-list__item" key={user.id}>
          <UserCard user={user} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
