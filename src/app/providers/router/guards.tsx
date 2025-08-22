import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store/store";

export function GuestGuard() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
}

export function AuthGuard() {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}
