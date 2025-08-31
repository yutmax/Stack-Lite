import { Button, TextField, Typography } from "@mui/material";
import "./SecuritySettings.scss";
import { useUpdateMe } from "../../../features/security/model/useUpdateMe";
import { useState, useEffect } from "react";
import { useChangePassword } from "../../../features/security/model/useChangePassword";

const SecuritySettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localPasswordError, setLocalPasswordError] = useState<string | null>(null);

  const { updateMe, isLoading: loadingUserUpdate, message: usernameMessage, success: usernameSuccess, error: usernameError } = useUpdateMe();

  const { changePassword, isLoading: loadingPasswordChange, message: passwordMessage, success: passwordSuccess, error: passwordError } = useChangePassword();

  useEffect(() => {
    if (usernameSuccess) setNewUsername("");
    if (passwordSuccess) {
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setLocalPasswordError(null);
    }
  }, [usernameSuccess, passwordSuccess]);

  const handleNewUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(e.target.value);
  };

  const handleNewUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername.trim()) {
      updateMe(newUsername.trim());
    }
  };

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalPasswordError(null);
    if (!oldPassword || !newPassword || !confirmPassword) {
      setLocalPasswordError("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalPasswordError("Passwords do not match");
      return;
    }
    changePassword(oldPassword, newPassword);
  };

  return (
    <div className="security-settings">
      <h3 className="security-settings__title">Edit your profile</h3>
      <div className="security-settings__item">
        <form className="security-settings__form" onSubmit={handleNewUsernameSubmit}>
          <Typography variant="h5">Change your username:</Typography>
          <TextField onChange={handleNewUsernameChange} label="New username" fullWidth autoComplete="off" value={newUsername} />
          <Button loading={loadingUserUpdate} type="submit" disabled={loadingUserUpdate || !newUsername.trim()}>
            Save
          </Button>
          {(usernameError || usernameMessage) && <Typography color={usernameSuccess ? "success.main" : "error"}>{usernameError || usernameMessage}</Typography>}
        </form>
      </div>
      <div className="security-settings__item">
        <form className="security-settings__form" onSubmit={handleChangePasswordSubmit}>
          <Typography variant="h5">Change your password:</Typography>
          <TextField label="Old password" fullWidth type="password" value={oldPassword} onChange={handleOldPasswordChange} autoComplete="off" />
          <TextField label="New password" fullWidth type="password" value={newPassword} onChange={handleNewPasswordChange} autoComplete="off" />
          <TextField label="Confirm password" fullWidth type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} autoComplete="off" />
          <Button loading={loadingPasswordChange} type="submit" disabled={loadingPasswordChange}>
            Change password
          </Button>
          {(localPasswordError || passwordError || passwordMessage) && <Typography color={passwordSuccess ? "success.main" : "error"}>{localPasswordError || passwordError || passwordMessage}</Typography>}
        </form>
      </div>
    </div>
  );
};
export default SecuritySettings;
