import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import { languages } from '../utils/languageUtils';
import api from '../auth/axiosInstance';

const NewSnippet = () => {
  const [snippetTitle, setSnippetTitle] = useState('');
  const [snippetLanguage, setSnippetLanguage] = useState('');
  const [snippetCode, setSnippetCode] = useState('');
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8001/');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleTitleChange = e => {
    setSnippetTitle(e.target.value);
  };

  const handleLanguageChange = e => {
    setSnippetLanguage(e.target.value);
  };

  const handleCodeChange = value => {
    setSnippetCode(value);
    if (socket) {
      socket.emit('snippetUpdate', value);
    }
  };

  useEffect(() => {
    if (socket) {
      socket.on('snippetUpdate', data => {
        setSnippetCode(data);
      });
    }

    return () => {
      if (socket) {
        socket.off('snippetUpdate');
      }
    };
  }, [socket]);

  const handleSubmit = async () => {
    try {
      await api.post('/api/snippets', {
        title: snippetTitle,
        code: snippetCode,
        language: snippetLanguage,
      });

      // Clear form inputs after successful submission
      setSnippetTitle('');
      setSnippetCode('');
      setSnippetLanguage('');

      // Redirect to the snippets page
      navigate('/snippets');
    } catch (error) {
      console.error(error);
    }
  };

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
                labelId="language-label"
                value={snippetLanguage}
                onChange={handleLanguageChange}
                autoWidth
              >
                {languages.map(language => (
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
        </Grid>
      </Box>
    </motion.div>
  );
};

export default NewSnippet;
