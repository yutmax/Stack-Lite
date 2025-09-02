import { CircularProgress } from "@mui/material";

import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
