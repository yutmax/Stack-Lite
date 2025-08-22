import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../../../pages/Register/RegisterPage";
import LoginPage from "../../../pages/Login/LoginPage";
import { AuthGuard, GuestGuard } from "./guards";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" element={<div>Home Page</div>} />
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
