import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./QuestionsToolbar.scss";

interface QuestionsToolbarProps {
  onSearch?: (query: string) => void;
}

const QuestionsToolbar = ({ onSearch }: QuestionsToolbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
    if (onSearch && value.trim() === "") {
      onSearch("");
    }
  };

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="question-toolbar">
      <div className="question-toolbar__line">
        <TextField onChange={handleSearchChange} fullWidth placeholder="Search request" />
        <Button onClick={handleSearchClick} variant="contained">
          Search
        </Button>
      </div>
      <NavLink className="question-toolbar__link" to="/questions/new">
        <AddCircleOutlineIcon />
        Ask Question
      </NavLink>
    </div>
  );
};

export default QuestionsToolbar;
