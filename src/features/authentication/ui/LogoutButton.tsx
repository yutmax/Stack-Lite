import { Button, styled, type ButtonProps } from "@mui/material";
import { useLogout } from "../model/useLogout";

const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
  background: "#fff",
  color: "#1976d2",
  border: "1px solid #1976d2",
  "&:hover": {
    background: "#f5f5f5",
    color: "#1565c0",
  },
}));

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { logout, isLoading } = useLogout();
  return (
    <CustomButton loading={isLoading} variant="contained" size="small" className={className} onClick={logout}>
      Sign out
    </CustomButton>
  );
};

export default LogoutButton;
