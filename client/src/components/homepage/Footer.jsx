import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ py: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          mb: 2,
        }}
      >
        <IconButton
          component={Link}
          href="https://github.com/IvanXh0"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <GitHubIcon />
        </IconButton>
        <IconButton
          component={Link}
          href="https://www.linkedin.com/in/ivan-apostolovski-22b361211/"
          target="_blank"
          rel="noopener"
          color="inherit"
        >
          <LinkedInIcon />
        </IconButton>
      </Box>
      <Typography variant="body2" align="center" color="text.secondary">
        &copy; {new Date().getFullYear()} CodeSnippet. All rights reserved.
      </Typography>
      <Typography variant="body2" align="center" color="text.secondary">
        Created with love by Ivan Apostolovski.
      </Typography>
    </Box>
  );
};

export default Footer;
