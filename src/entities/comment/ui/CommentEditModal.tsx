import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import type { Comment } from "../model/types";

interface CommentEditModalProps {
  open: boolean;
  comment: Comment | null;
  onClose: () => void;
  onSave: (content: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
}

export const CommentEditModal = ({ open, comment, onClose, onSave, loading, error }: CommentEditModalProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (open && comment) {
      setValue(comment.content || "");
    }
  }, [open, comment]);

  const handleSubmit = async () => {
    if (!value.trim()) return;
    await onSave(value.trim());
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit comment</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <TextField autoFocus fullWidth multiline minRows={3} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Edit your comment" />
        {error && <div style={{ color: "#f44336", marginTop: 8, fontSize: 14 }}>{error}</div>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading || !value.trim()} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentEditModal;
