import { IconButton } from "@mui/material";
import LogoutButton from "../../../features/authentication/ui/LogoutButton";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../entities/user/model/selectors";
import { Link } from "react-router-dom";

import "./Header.scss";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

const Header = ({ onToggleSidebar }: HeaderProps) => {
  const isAuth = useSelector(selectIsAuth);

  return (
    <header className="header">
      <div className="header__container">
        <IconButton onClick={onToggleSidebar} color="inherit" sx={{ color: "#fff" }} aria-label="menu">
          <MenuIcon />
        </IconButton>

        <h1 className="header__title">Stack Lite</h1>
        {isAuth ? (
          <LogoutButton />
        ) : (
          <Link className="header__link link link--white" to="/login">
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
