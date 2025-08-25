import { Button } from "@mui/material";
import { useLogout } from "../model/useLogout";

type LogoutButtonProps = {
  className?: string;
};

const LogoutButton = ({ className }: LogoutButtonProps) => {
  const { logout, isLoading } = useLogout();
  return (
    <Button loading={isLoading} className={className} onClick={logout}>
      Sign out
    </Button>
  );
};

export default LogoutButton;
