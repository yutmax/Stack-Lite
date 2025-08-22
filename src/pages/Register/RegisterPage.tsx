import { useState } from "react";
import { AuthForm } from "../../shared/ui/AuthForm/AuthForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthPage } from "../../shared/ui/AuthPage/AuthPage";
import { registerUser } from "../../entities/user/model/slice";
import { useAppDispatch } from "../../shared/lib/hooks/storeHooks";

const RegisterPage = () => {
  const [values, setValues] = useState({ username: "", password: "", confirm: "" });
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
    if (values.password !== values.confirm) validationErrors.confirm = "Passwords do not match";
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setFormError("");
    try {
      await dispatch(registerUser({ username: values.username, password: values.password })).unwrap();
      navigate("/login");
    } catch (err: any) {
      if (err.message) {
        setFormError(err.message);
      } else {
        setFormError("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <AuthForm
        title="Sign up"
        fields={[
          { name: "username", label: "Username", autoComplete: "off" },
          { name: "password", label: "Password", type: "password" },
          { name: "confirm", label: "Confirm Password", type: "password" },
        ]}
        values={values}
        errors={errors}
        formError={formError}
        isLoading={loading}
        submitLabel="Create account"
        onChange={onChange}
        onSubmit={onSubmit}
        footer={
          <div className="auth-redirect">
            <span>Already have an account?</span>
            <Link className="auth-redirect__link link" to="/login">
              Sign in
            </Link>
          </div>
        }
      />
    </AuthPage>
  );
};

export default RegisterPage;
