import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress } from "@mui/material";
import type { Comment } from "../model/types";

interface CommentEditModalProps {
  open: boolean;
  comment: Comment | null;
  onClose: () => void;
  onSave: (content: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

const CommentEditModal = ({ open, comment, onClose, onSave, loading = false, error = null }: CommentEditModalProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open && comment) {
      setValue(comment.content || "");
    }
  }, [open, comment]);

  const handleSubmit = async () => {
    if (!value.trim() || loading) return;
    await onSave(value.trim());
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit comment</DialogTitle>
      <DialogContent>
        <TextField value={value} onChange={(e) => setValue(e.target.value)} fullWidth multiline minRows={3} autoFocus disabled={loading} sx={{ mt: 1 }} />
        {error && <p style={{ color: "red", marginTop: 8 }}>{error}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={!value.trim() || loading} startIcon={loading ? <CircularProgress size={18} /> : null}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentEditModal;
