import { useState } from "react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="register-page">
      <div className="register-page__container">
        <form className="register-page__form auth-form">
          <h1 className="auth-form__title">Sing up</h1>
        </form>
      </div>
    </div>
  );
};
