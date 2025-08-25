import { NavLink } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

import "./Sidebar.scss";

type SidebarProps = {
  open: boolean;
};

const Sidebar = ({ open }: SidebarProps) => {
  return (
    <aside className={`sidebar ${open ? "_open" : ""}`}>
      <nav className="sidebar__nav">
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <NavLink to="/" className={({ isActive }) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")}>
              <HomeIcon /> <span>Home</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/account" className={({ isActive }) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")}>
              <PersonIcon /> <span>My Account</span>
            </NavLink>
          </li>
          <li className="sidebar__item">
            <NavLink to="/others" className={({ isActive }) => (isActive ? "sidebar__link sidebar__link--active" : "sidebar__link")}>
              <GroupsIcon /> <span>Others</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
