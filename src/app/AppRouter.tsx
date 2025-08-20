import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<div>Login Page</div>} />
        <Route path="/register" element={<div>Register Page</div>} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
