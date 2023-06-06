import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Editor } from "@monaco-editor/react";
import api from "../auth/axiosInstance";
import { useNavigate } from "react-router-dom";
import { languages } from "../utils/languageUtils";
import SaveIcon from "@mui/icons-material/Save";
import { useStore } from "../hooks/useStore";
import { motion } from "framer-motion";

const SnippetDetails = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const [snippetCode, setSnippetCode] = useState("");
  const [snippetLanguage, setSnippetLanguage] = useState("");
  const [snippetTitle, setSnippetTitle] = useState("");
  const [snippetOwner, setSnippetOwner] = useState("");
  const navigation = useNavigate();
  const { authData } = useStore();

  useEffect(() => {
    const fetchSnippet = async () => {
      try {
        const response = await api.get(`/api/snippets/${id}`);
        const { title, code, language, email } = response.data;
        setSnippet(response.data);
        setSnippetTitle(title);
        setSnippetCode(code);
        setSnippetLanguage(language);
        setSnippetOwner(email);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSnippet();
  }, [id]);

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

      navigation("/snippets");
    } catch (error) {
      console.log(error);
    }
  };

  if (!snippet) {
    return <div>Loading...</div>; // Render a loading state or handle the case when snippet is not available yet
  }

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <TextField
            label="Title"
            disabled={authData.email !== snippetOwner}
            value={snippetTitle}
            onChange={handleTitleChange}
            fullWidth
            sx={{ mt: 2 }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              label="Language"
              disabled={authData.email !== snippetOwner}
              labelId="language-label"
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
            height="70vh"
            value={snippetCode}
            onChange={handleCodeChange}
            options={{
              automaticLayout: true,
              fontSize: 14,
            }}
          />
        </Grid>
        {authData.email && authData.email === snippetOwner && (
          <Grid item xs={12}>
            <Box width="fit-content" mx="auto" mt={3}>
              <Button
                onClick={handleSubmit}
                variant="contained"
                size="large"
                color="success"
              >
                <SaveIcon />
                Save Changes
              </Button>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
    </motion.div>
  );
};

export default SnippetDetails;
