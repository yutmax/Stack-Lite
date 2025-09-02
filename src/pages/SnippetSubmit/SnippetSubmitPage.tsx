import "./SnippetSubmitPage.scss";
import { useState } from "react";
import { useSubmitSnippet } from "../../features/post/model/useSubmitSnippet";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import SnippetManageForm from "../../widgets/SnippetManageForm/ui/SnippetManageForm";
import SuccessMessage from "../../widgets/SuccessMessage/ui/SuccessMessage";

const SnippetSubmitPage = () => {
  const { submitSnippet, isSubmitting, error, success } = useSubmitSnippet();
  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLanguage || !code.trim()) return;
    submitSnippet(selectedLanguage, code);
  };

  return (
    <div className="snippet-submit-page">
      <div className="snippet-submit-page__container">
        <h2 className="snippet-submit-page__title">Create new snippet</h2>

        <SnippetManageForm submitLoading={isSubmitting} code={code} selectedLanguage={selectedLanguage} setCode={handleCodeChange} setSelectedLanguage={handleLanguageChange} handleSubmit={handleSubmit} />
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message="Snippet submitted successfully!" />}
      </div>
    </div>
  );
};

export default SnippetSubmitPage;
