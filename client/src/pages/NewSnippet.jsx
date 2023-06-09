import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  Select,
  TextField,
} from '@mui/material';
import { Editor } from '@monaco-editor/react';
import { motion } from 'framer-motion';
import SaveIcon from '@mui/icons-material/Save';
import { languages } from '../utils/languageUtils';
import api from '../auth/axiosInstance';
import axios from 'axios';

const NewSnippet = () => {
  const [snippetTitle, setSnippetTitle] = useState('');
  const [snippetLanguage, setSnippetLanguage] = useState('');
  const [snippetCode, setSnippetCode] = useState(`console.log('Hello World')`);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [outputDetails, setOutputDetails] = useState(null);
  const [languageId, setLanguageId] = useState(null);

  const handleTitleChange = e => {
    setSnippetTitle(e.target.value);
  };

  const handleLanguageChange = e => {
    setSnippetLanguage(e.target.value);
    const selectedLanguage = languages.find(
      language => language.name.split(' ')[0] === e.target.value
    );
    setLanguageId(selectedLanguage.id);
  };

  const handleCodeChange = value => {
    setSnippetCode(value);
  };

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

  const handleCompile = async () => {
    setProcessing(true);
    const formData = {
      language_id: languageId,
      source_code: btoa(snippetCode),
    };

    const options = {
      method: 'POST',
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'content-type': 'application/json',
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch(err => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error);
      });
  };

  const checkStatus = async token => {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_RAPID_API_URL + '/' + token,
      params: { base64_encoded: 'true', fields: '*' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_HOST,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      // Processed - we have a result
      if (statusId === 1 || statusId === 2) {
        // still processing
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        return;
      }
    } catch (err) {
      console.log('err', err);
      setProcessing(false);
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
                  <MenuItem
                    key={language.id}
                    value={language.name.split(' ')[0]}
                    id={language.id}
                  >
                    {language.name}
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
              <Button
                onClick={handleCompile}
                variant="contained"
                disabled={processing}
                sx={{ ml: 2 }}
                size="large"
                color="warning"
              >
                Compile Code
              </Button>
            </Box>
            {processing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="body1">Compiling...</Typography>
              </motion.div>
            ) : (
              outputDetails && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Typography mt={2} variant="h6">
                    Output:
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      background: '#f6f8fa',
                      p: 2,
                      mt: 2,
                      borderRadius: '4px',
                      overflowX: 'auto',
                    }}
                  >
                    {atob(outputDetails.stdout)}
                  </Box>
                </motion.div>
              )
            )}
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

export default NewSnippet;
