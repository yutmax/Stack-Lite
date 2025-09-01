import "./SnippetSubmitPage.scss";
import { useState, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { useSnippetLanguages } from "../../features/post/model/useSnippetLanguages";
import { useSubmitSnippet } from "../../features/post/model/useSubmitSnippet";
import { getLanguageExtension } from "../../shared/config/snippetLanguageExtensions";
import CodeEditor from "../../shared/ui/CodeEditor/CodeEditor";
import LanguageSelect from "../../features/post/ui/LanguageSelect/LanguageSelect";

const SnippetSubmitPage = () => {
  const { languages, loading: langsLoading, error: langsError } = useSnippetLanguages();
  const { submitSnippet, isSubmitting, error: submitError, success } = useSubmitSnippet();
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [code, setCode] = useState("");

  const extension = useMemo(() => (selectedLanguage ? getLanguageExtension(selectedLanguage) : undefined), [selectedLanguage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLanguage || !code.trim()) return;
    submitSnippet(selectedLanguage, code);
  };

  return (
    <div className="snippet-submit-page">
      <div className="snippet-submit-page__container">
        <h2 className="snippet-submit-page__title">Create new snippet</h2>
        {langsError && <Typography color="error">{langsError}</Typography>}
        <form className="snippet-submit-page__form" onSubmit={handleSubmit}>
          <div className="snippet-submit-page__form-item">
            <LanguageSelect value={selectedLanguage} onChange={setSelectedLanguage} languages={languages} disabled={langsLoading} />
          </div>
          <div className="snippet-submit-page__form-item">
            <div className="code-editor-container">
              <label className="code-editor-label">Code</label>
              <CodeEditor value={code} onChange={setCode} extension={extension} placeholder="Write your code here..." />
            </div>
          </div>
          {submitError && <Typography color="error">{submitError}</Typography>}
          {success && <Typography color="success.main">Snippet submitted!</Typography>}
          <Button type="submit" variant="contained" loading={isSubmitting} disabled={!selectedLanguage || !code.trim()}>
            Submit Snippet
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SnippetSubmitPage;
