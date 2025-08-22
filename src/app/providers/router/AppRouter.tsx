import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../../../pages/Register/RegisterPage";
import LoginPage from "../../../pages/Login/LoginPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
