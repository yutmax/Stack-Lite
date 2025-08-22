import type { ReactNode } from "react";
import "./AuthPage.scss";

type AuthPageProps = {
  children: ReactNode;
};

export const AuthPage = ({ children }: AuthPageProps) => {
  return (
    <main className="auth-page">
      <div className="auth-page__container">{children}</div>
    </main>
  );
};
