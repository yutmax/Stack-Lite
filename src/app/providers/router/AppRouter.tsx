import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "../../../pages/Register/RegisterPage";
import LoginPage from "../../../pages/Login/LoginPage";
import { AuthGuard, GuestGuard } from "./guards";
import HomePage from "../../../pages/Home/HomePage";
import AppLayout from "../../../widgets/Layout/ui/AppLayout";
import PostPage from "../../../pages/Post/PostPage";
import AccountPage from "../../../pages/Account/AccountPage";
import SnippetSubmitPage from "../../../pages/SnippetSubmit/SnippetSubmitPage";
import MySnippetsPage from "../../../pages/MySnippets/MySnippetsPage";
import SnippetEditPage from "../../../pages/SnippetEdit/SnippetEditPage";
import UsersPage from "../../../pages/Users/UsersPage";
import UserPage from "../../../pages/User/UserPage";
import QuestionsPage from "../../../pages/Question/QuestionPage";
import NewQuestionPage from "../../../pages/NewQuestion/NewQuestionPage";
import EditQuestionPage from "../../../pages/EditQuestion/EditQuestionPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route element={<AppLayout />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/new-snippet" element={<SnippetSubmitPage />} />
            <Route path="/my-snippets" element={<MySnippetsPage />} />
            <Route path="/snippet/:id/edit" element={<SnippetEditPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/questions/new" element={<NewQuestionPage />} />
            <Route path="/questions/:id" element={<EditQuestionPage />} />
          </Route>
        </Route>

        <Route element={<GuestGuard />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/questions" element={<QuestionsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
