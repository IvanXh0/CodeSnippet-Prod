import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import api from "../../auth/axiosInstance";
import { languages } from "../../utils/languageUtils";

const SnippetEditor = (
  { fetchSnippets, id, title, code, language, handleClose, open },
) => {
  const [snippetCode, setSnippetCode] = useState(code);
  const [snippetLanguage, setSnippetLanguage] = useState(language);
  const [snippetTitle, setSnippetTitle] = useState(title);

  const handleTitleChange = (e) => {
    setSnippetTitle(e.target.value);
  };

  const handleCodeChange = (value) => {
    setSnippetCode(value);
  };

  const handleLanguageChange = (e) => {
    setSnippetLanguage(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      await api.patch(`/api/snippets/${id}`, {
        title: snippetTitle,
        code: snippetCode,
        language: snippetLanguage,
      });

      fetchSnippets();
    } catch (error) {
      console.log(error);
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Snippet</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              value={snippetTitle}
              onChange={handleTitleChange}
              fullWidth
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl sx={{ mt: 2 }} fullWidth>
              <InputLabel id="language">Language</InputLabel>
              <Select
                label="Language"
                labelId="language"
                value={snippetLanguage}
                onChange={handleLanguageChange}
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
              language={snippetLanguage.toLowerCase()}
              theme="vs-dark"
              defaultValue="console.log('Hello World')"
              height="50vh"
              value={snippetCode}
              onChange={handleCodeChange}
              options={{
                automaticLayout: true,
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="warning">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="success">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SnippetEditor;
