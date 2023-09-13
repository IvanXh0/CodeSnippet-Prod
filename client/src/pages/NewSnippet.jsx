import React, { useState, useEffect } from 'react';
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
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

const NewSnippet = () => {
  const [snippetTitle, setSnippetTitle] = useState('');
  const [snippetLanguage, setSnippetLanguage] = useState('');
  const [snippetCode, setSnippetCode] = useState(`console.log('Hello World')`);
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [outputDetails, setOutputDetails] = useState(null);
  const [languageId, setLanguageId] = useState(null);

  useEffect(() => {
    if (outputDetails) {
      const outputElement = document.getElementById('output-message');
      if (outputElement) {
        outputElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [outputDetails]);

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
        console.log(error);
        setProcessing(false);
        toast.error('Please add some code and select a language.');
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
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        toast('Successfully compiled!');
        setOutputDetails(response.data);
        return;
      }
    } catch (err) {
      console.log('err', err);
      setProcessing(false);
      toast.error('Something went wrong..');
    }
  };

  return (
    <>
      <Helmet>
        <title>New Snippet | CodeSnippet</title>
      </Helmet>
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
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                mt={3}
              >
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: '#3f51b5',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#303f9f',
                    },
                  }}
                  startIcon={<SaveIcon />}
                >
                  Save Changes
                </Button>
                <Button
                  onClick={handleCompile}
                  variant="contained"
                  disabled={processing}
                  sx={{
                    backgroundColor: '#f44336',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#d32f2f',
                    },
                  }}
                  size="medium"
                  startIcon={<SettingsSuggestIcon />}
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
                      id="output-message"
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
    </>
  );
};

export default NewSnippet;
