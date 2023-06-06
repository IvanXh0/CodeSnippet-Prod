import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animationData from '../../assets/code3.json';
import { theme } from '../../utils/themeUtils';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { handleAddSnippet } from '../../utils/snippetUtils';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleAddSnippetClick = () => {
    handleAddSnippet(navigate);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography
          fontSize={{ xs: '1.8rem', md: '2.3rem', lg: '2.8rem' }}
          fontWeight="bolder"
        >
          <span
            style={{
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              color: 'white',
              padding: '0.5rem',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
              },
            }}
          >
            Supercharge
          </span>{' '}
          your coding journey with CodeSnippet.
        </Typography>
        <Typography
          mt={2}
          fontSize={{ xs: '1.2rem', md: '1.3rem', lg: '1.5rem' }}
          sx={{ fontWeight: 400, color: '#86909c' }}
        >
          Share code effortlessly, store for future reference.
        </Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleAddSnippetClick}
            sx={{
              fontSize: '1.2rem',
              textTransform: 'capitalize',
              borderRadius: '0.5rem',
              background: '#FE6B8B',
              color: 'white',
              padding: '0.9rem',
              boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
              '&:hover': {
                background: '#FF8E53', // Lighter variant
                animation: 'bounce 0.5s', // Apply bounce animation on hover
              },
              '@keyframes bounce': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
                '100%': { transform: 'scale(1)' },
              },
            }}
          >
            <AddIcon sx={{ marginRight: '0.5rem' }} fontSize="medium" />
            Create snippet
          </Button>
        </Box>
        <Box mt={2}>
          <Lottie animationData={animationData} />
        </Box>
      </ThemeProvider>
    </>
  );
};

export default HeroSection;
