import { useState } from "react";
import { AuthForm } from "../../shared/ui/AuthForm/AuthForm";
import { Link } from "react-router-dom";
import { AuthPage } from "../../shared/ui/AuthPage/AuthPage";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../shared/lib/hooks/storeHooks";
import { login, loginUser } from "../../entities/user/model/slice";

import LockOutlineIcon from "@mui/icons-material/LockOutline";
import PersonIcon from "@mui/icons-material/Person";

const LoginPage = () => {
  const [values, setValues] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [formError, setFormError] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (name: string, value: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    setFormError("");
  };

  const validate = () => {
    const validationErrors: { [k: string]: string } = {};
    if (!values.username) validationErrors.username = "Username is required";
    if (!values.password) validationErrors.password = "Password is required";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setFormError("");
    try {
      const userData = await dispatch(loginUser(values)).unwrap();
      dispatch(login(userData.data));
      navigate("/");
    } catch (err: any) {
      if (err.message) {
        setFormError(err.message);
      } else {
        setFormError("Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthForm
        title="Sign in"
        fields={[
          { name: "username", label: "Username", autoComplete: "on", fieldIcon: <PersonIcon color="action" /> },
          { name: "password", label: "Password", type: "password", fieldIcon: <LockOutlineIcon color="action" /> },
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
