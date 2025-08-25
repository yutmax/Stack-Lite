import type { ReactNode } from "react";
import { Alert, Button, TextField, CircularProgress, InputAdornment } from "@mui/material";
import "./AuthForm.scss";

export type AuthField = {
  name: string;
  label: string;
  type?: string;
  autoComplete?: string;
  fieldIcon?: ReactNode;
};

type AuthFormProps = {
  title: string;
  fields: AuthField[];
  values: Record<string, string>;
  errors?: Partial<Record<string, string>>;
  formError?: string;
  isLoading?: boolean;
  submitLabel: string;
  onChange: (name: string, value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  footer?: ReactNode;
};

function handleFieldChange(onChange: (name: string, value: string) => void, fieldName: string) {
  return function (e: React.ChangeEvent<HTMLInputElement>) {
    onChange(fieldName, e.target.value);
  };
}

export const AuthForm = ({ title, fields, values, errors, formError, isLoading, submitLabel, onChange, onSubmit, footer }: AuthFormProps) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h1 className="auth-form__title">{title}</h1>
      {formError ? <Alert severity="error">{formError}</Alert> : null}

      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type || "text"}
          name={field.name}
          value={values[field.name] ?? ""}
          onChange={handleFieldChange(onChange, field.name)}
          error={Boolean(errors?.[field.name])}
          helperText={errors?.[field.name]}
          autoComplete={field.autoComplete}
          fullWidth
          slotProps={
            field.fieldIcon
              ? {
                  input: {
                    endAdornment: field.fieldIcon,
                  },
                }
              : undefined
          }
        />
      ))}

      {isLoading ? (
        <CircularProgress size={32} style={{ margin: "16px auto", display: "block" }} />
      ) : (
        <Button type="submit" variant="contained" size="large" disabled={isLoading}>
          {submitLabel}
        </Button>
      )}

      {footer}
    </form>
  );
};
