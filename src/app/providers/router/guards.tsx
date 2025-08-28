import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAuth } from "../../../entities/user/model/selectors";

export function GuestGuard() {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
}

export function AuthGuard() {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
