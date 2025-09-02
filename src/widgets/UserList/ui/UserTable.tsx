import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { User } from "../../../entities/user/model/types";
import { NavLink } from "react-router-dom";

import "./UserTable.scss";
interface UserListProps {
  users: User[];
}

const UserTable = ({ users }: UserListProps) => {
  return (
    <div className="user-table">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableCell>ID</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Profile</TableCell>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <NavLink className="link" to={`/user/${user.id}`}>
                    View
                  </NavLink>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserTable;
