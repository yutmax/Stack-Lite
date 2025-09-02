import { useMemo } from "react";
import { useSnippetLanguages } from "../../../features/post/model/useSnippetLanguages";
import LanguageSelect from "../../../features/post/ui/LanguageSelect/LanguageSelect";
import CodeEditor from "../../../shared/ui/CodeEditor/CodeEditor";
import { getLanguageExtension } from "../../../shared/config/snippetLanguageExtensions";
import { Button } from "@mui/material";

import "./SnippetManageForm.scss";

interface SnippetManageFormProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  setCode: (code: string) => void;
  code: string;
  submitButtonText?: string;
  handleSubmit?: (e: React.FormEvent) => void;
  submitLoading?: boolean;
}

const SnippetManageForm = ({ selectedLanguage, submitLoading, handleSubmit, setSelectedLanguage, setCode, code, submitButtonText = "Submit Snippet" }: SnippetManageFormProps) => {
  const { languages, loading: languagesIsLoading } = useSnippetLanguages();

  const extension = useMemo(() => (selectedLanguage ? getLanguageExtension(selectedLanguage) : undefined), [selectedLanguage]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };
  return (
    <form className="snippet-manage-form" onSubmit={handleSubmit}>
      <div className="snippet-manage-form__line">
        <LanguageSelect value={selectedLanguage} onChange={handleLanguageChange} languages={languages} disabled={languagesIsLoading} />
      </div>
      <div className="snippet-manage-form__line">
        <label className="snippet-manage-form__label">Code</label>
        <CodeEditor value={code} onChange={setCode} extension={extension} placeholder="Write your code here..." />
      </div>
      <div className="snippet-manage-form__line">
        <Button fullWidth type="submit" variant="contained" loading={submitLoading}>
          {submitButtonText}
        </Button>
      </div>
    </form>
  );
};

export default SnippetManageForm;
