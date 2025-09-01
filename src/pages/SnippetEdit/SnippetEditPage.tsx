import "./SnippetEditPage.scss";
import { useEffect, useMemo, useState } from "react";
import { Button, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSnippetLanguages } from "../../features/post/model/useSnippetLanguages";
import { useUpdateSnippet } from "../../features/post/model/useUpdateSnippet";
import { getLanguageExtension } from "../../shared/config/snippetLanguageExtensions";
import CodeEditor from "../../shared/ui/CodeEditor/CodeEditor";
import LanguageSelect from "../../features/post/ui/LanguageSelect/LanguageSelect";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks/storeHooks";
import { fetchPostById } from "../../entities/post/model/fetchPostById";
import { selectPosts } from "../../entities/post/model/selectors";

const SnippetEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const existing = posts.find((p) => p.id === id);

  const { languages, loading: langsLoading, error: langsError } = useSnippetLanguages();
  const { updateSnippet, isUpdating, error: updateError, success } = useUpdateSnippet();
  const [language, setLanguage] = useState(existing?.language || "");
  const [code, setCode] = useState(existing?.code || "");

  useEffect(() => {
    if (!id) return;
    if (!existing) {
      dispatch(fetchPostById({ id }));
    } else {
      setLanguage(existing.language);
      setCode(existing.code);
    }
  }, [id, existing, dispatch]);

  const extension = useMemo(() => (language ? getLanguageExtension(language) : undefined), [language]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    if (!language || !code.trim()) return;
    await updateSnippet(id, { language, code });
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
        {langsError && <Typography color="error">{langsError}</Typography>}
        <form className="snippet-edit-page__form" onSubmit={handleSubmit}>
          <div className="snippet-edit-page__form-item">
            <LanguageSelect value={language} onChange={setLanguage} languages={languages} disabled={langsLoading || isUpdating} />
          </div>
          <div className="snippet-edit-page__form-item">
            <div className="code-editor-container">
              <label className="code-editor-label">Code</label>
              <CodeEditor value={code} onChange={setCode} extension={extension} placeholder="Update code..." />
            </div>
          </div>
          {updateError && <Typography color="error">{updateError}</Typography>}
          {success && <Typography color="success.main">Saved!</Typography>}
          <Button type="submit" variant="contained" loading={isUpdating} disabled={!language || !code.trim() || isUpdating}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SnippetEditPage;
