import { useState, useContext } from 'react';
import { Box, Button, ThemeProvider, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import animatedJson from '../../assets/code3.json';
import { theme } from '../../utils/themeUtils';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { handleAddSnippet } from '../../utils/snippetUtils';
import { GoogleLogin } from '@react-oauth/google';
import { useStore } from '../../hooks/useStore';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import { motion } from 'framer-motion';
import smallLottie from '../../assets/lottie-small.png';

const HeroSection = () => {
  const navigate = useNavigate();
  const { authData, setAuthData } = useStore();
  const { login } = useContext(AuthContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const animationData = JSON.parse(JSON.stringify(animatedJson));
  const isSmallDevice = window.innerWidth <= 480;

  const handleAddSnippetClick = () => {
    if (!authData) {
      setShowLoginPrompt(true);
    } else {
      handleAddSnippet(navigate);
    }
  };

  const handleGoogleLoginSuccess = async credentialResponse => {
    const { data } = await axios.post(
      'https://codesnippet-prod.onrender.com/api/auth/login',
      {
        token: credentialResponse.credential,
      }
    );
    localStorage.setItem('AuthData', JSON.stringify(data));
    setAuthData(data);
    localStorage.setItem('accessToken', data.accessToken);
    login(data.accessToken);

    // after all is done:
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
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '1rem',
            }}
          >
            <Typography variant="h6" color="textPrimary" align="center">
              Let's log you in first, shall we?
            </Typography>
            <GoogleLogin
              useOneTap={true}
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              onSuccess={handleGoogleLoginSuccess}
              onFailure={() => {
                console.log('Login Failed');
              }}
              cookiePolicy={'single_host_origin'}
              style={{ marginTop: '1rem' }}
            />
          </motion.div>
        )}
        <Box
          mt={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isSmallDevice ? (
            <img
              style={{ maxWidth: '100%', height: 'auto' }}
              src={smallLottie}
              alt="static animation for smaller devices"
            />
          ) : (
            <Lottie animationData={animationData} loop={true} />
          )}
        </Box>
      </ThemeProvider>
    </>
  );
};

export default HeroSection;
