import { useState } from "react";
import { AuthForm } from "../../shared/ui/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { AuthPage } from "../../shared/ui/AuthPage/AuthPage";

const LoginPage = () => {
  const [values, setValues] = useState({ username: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [formError, setFormError] = useState<string>("");

  const onChange = () => {};
  const onSubmit = () => {};

  return (
    <AuthPage>
      <AuthForm
        title="Sign in"
        fields={[
          { name: "username", label: "Username", autoComplete: "off" },
          { name: "password", label: "Password", type: "password" },
        ]}
        values={values}
        errors={errors}
        formError={formError}
        isLoading={loading}
        submitLabel="Enter the account"
        onChange={onChange}
        onSubmit={onSubmit}
        footer={
          <div className="auth-redirect">
            <span>You have no account?</span>
            <Link className="auth-redirect__link link" to="/register">
              Sign up
            </Link>
          </div>
        }
      />
    </AuthPage>
  );
};

export default LoginPage;
