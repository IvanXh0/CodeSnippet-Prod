import React, { useState } from "react";
import api from "../../auth/axiosInstance";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  DialogTitle,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import { languages } from "../../utils/languageUtils";

const AddNewSnippet = ({ fetchSnippets , buttonIcon, buttonStyle}) => {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/snippets", {
        title,
        code,
        language,
      });

      // Clear form inputs after successful submission
      setTitle("");
      setCode("");
      setLanguage("");
      handleClose();
      fetchSnippets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="inherit" sx={buttonStyle} startIcon={buttonIcon} onClick={handleOpen}>
        Add Snippet
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Snippet</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid mt={2} item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="language">Language</InputLabel>
                <Select
                  label="Language"
                  labelId="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  autoWidth
                >
                  {languages.map((language) => (
                    <MenuItem key={language.value} value={language.value}>
                      {language.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Editor
                defaultLanguage="javascript"
                language={language.toLowerCase()}
                theme="vs-dark"
                defaultValue="console.log('Hello World')"
                height="90vh"
                value={code}
                onChange={(value) => setCode(value)}
                options={{
                  automaticLayout: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddNewSnippet;
