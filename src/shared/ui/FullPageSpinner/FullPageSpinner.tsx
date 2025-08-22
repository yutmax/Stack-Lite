import { CircularProgress } from "@mui/material";
import "./FullPageSpinner.scss";

type FullPageSpinnerProps = {
  color?: "secondary" | "inherit" | "primary";
  size?: number;
};

const FullPageSpinner = ({ color = "primary", size = 40 }: FullPageSpinnerProps) => {
  return (
    <div className="full-page-spinner">
      <CircularProgress size={size} color={color} />
    </div>
  );
};

export default FullPageSpinner;
