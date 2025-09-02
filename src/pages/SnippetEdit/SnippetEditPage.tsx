import { useEffect, useState } from "react";
import { usePostById } from "../../features/post/model/usePostById";
import SnippetManageForm from "../../widgets/SnippetManageForm/ui/SnippetManageForm";
import "./SnippetEditPage.scss";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../shared/ui/Spinner/Spinner";
import ErrorMessage from "../../shared/ui/ErrorMessage/ErrorMessage";
import { useUpdateSnippet } from "../../features/post/model/useUpdateSnippet";

const SnippetEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { post, error: postError, loading } = usePostById(Number(id));
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const { updateSnippet, isUpdating, error: updateError, success } = useUpdateSnippet();

  useEffect(() => {
    if (post) {
      setCode(post.code);
      setSelectedLanguage(post.language);
    }
  }, [post]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };
  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLanguage || !code.trim() || !id) return;
    await updateSnippet(id, { language: selectedLanguage, code });
  };

  useEffect(() => {
    if (success && id) {
      navigate(`/post/${id}`);
    }
  }, [success, id, navigate]);

  return (
    <div className="snippet-edit-page">
      <div className="snippet-edit-page__container">
        <h2 className="snippet-edit-page__title">Edit snippet</h2>
        {loading && <Spinner />}
        {postError && <ErrorMessage message={postError} />}
        {post && <SnippetManageForm submitLoading={isUpdating} code={code} selectedLanguage={selectedLanguage} setCode={handleCodeChange} setSelectedLanguage={handleLanguageChange} handleSubmit={handleSubmit} submitButtonText="Save Changes" />}
      </div>
    </div>
  );
};

export default SnippetEditPage;
