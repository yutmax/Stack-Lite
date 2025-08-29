import { Button, TextField, Typography } from "@mui/material";
import "./SecuritySettings.scss";

const SecuritySettings = () => {
  return (
    <div className="security-settings">
      <h3 className="security-settings__title">Edit your profile</h3>
      <div className="security-settings__item">
        <form className="security-settings__form">
          <Typography variant="h5">Change your username:</Typography>
          <TextField label="New label" fullWidth autoComplete="off" />
          <Button>Save</Button>
        </form>
      </div>
      <div className="security-settings__item">
        <form className="security-settings__form">
          <Typography variant="h5">Change your password:</Typography>
          <TextField label="Old password" fullWidth type="password" />
          <TextField label="New password" fullWidth type="password" />
          <TextField label="Confirm password" fullWidth type="password" />
          <Button>Change password</Button>
        </form>
      </div>
    </div>
  );
};
export default SecuritySettings;
