import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../../../pages/Register/RegisterPage";
import LoginPage from "../../../pages/Login/LoginPage";
import { AuthGuard, GuestGuard } from "./guards";
import HomePage from "../../../pages/Home/HomePage";
import AppLayout from "../../../widgets/Layout/ui/AppLayout";
import PostPage from "../../../pages/Post/PostPage";
import AccountPage from "../../../pages/Account/AccountPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/others" element={<div>Others page</div>} />
          </Route>
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
