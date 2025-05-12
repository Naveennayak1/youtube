import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentSection = ({ videoId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/${videoId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${videoId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditComment = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/comments/${editId}`,
        { text: editText },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComments(comments.map(c => (c._id === editId ? { ...c, text: editText } : c)));
      setEditId(null);
      setEditText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setComments(comments.filter(c => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" mb={2}>Comments</Typography>
      {user ? (
        <Box mb={2}>
          <TextField
            label="Add a comment"
            multiline
            fullWidth
            rows={3}
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
          />
          <Button variant="contained" color="error" sx={{ mt: 1 }} onClick={handleAddComment}>Post</Button>
        </Box>
      ) : (
        <Typography variant="body2" color="text.secondary">Please sign in to comment.</Typography>
      )}
      {comments.length === 0 && <Typography>No comments yet.</Typography>}
      {comments.map(comment => (
        <Box key={comment._id} sx={{ mb: 2, borderBottom: "1px solid #ddd", pb: 1 }}>
          <Typography variant="subtitle2">{comment.userId?.username || "User"}</Typography>
          {editId === comment._id ? (
            <>
              <TextField
                multiline
                fullWidth
                rows={2}
                value={editText}
                onChange={e => setEditText(e.target.value)}
              />
              <Button size="small" onClick={saveEdit}>Save</Button>
              <Button size="small" onClick={() => setEditId(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <Typography variant="body1">{comment.text}</Typography>
              {user && user.userId === comment.userId?._id && (
                <>
                  <IconButton size="small" onClick={() => handleEditComment(comment._id, comment.text)}><EditIcon fontSize="small" /></IconButton>
                  <IconButton size="small" onClick={() => handleDelete(comment._id)}><DeleteIcon fontSize="small" /></IconButton>
                </>
              )}
            </>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommentSection;
