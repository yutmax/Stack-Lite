import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

interface LanguageSelectProps {
  value: string;
  onChange: (val: string) => void;
  languages: string[];
  disabled?: boolean;
}
const LanguageSelect = ({ value, onChange, languages, disabled }: LanguageSelectProps) => {
  const handleChange = (e: SelectChangeEvent) => onChange(e.target.value);
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="snippet-language-label">Language</InputLabel>
      <Select labelId="snippet-language-label" label="Language" value={value} onChange={handleChange}>
        {languages.map((l) => (
          <MenuItem key={l} value={l}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
export default LanguageSelect;
