import React from 'react';
import { Box, Typography, ThemeProvider } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../utils/themeUtils';
import intellisense from '../../assets/intellisense.webp';

const FourthSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
        transition={{ duration: 0.3 }}
      >
        <Box
          display="flex"
          flexDirection={{
            xs: 'column',
            sm: 'column',
            md: 'row-reverse',
          }}
        >
          <Box
            flex="1"
            textAlign="center"
            ml={{ xs: 0, sm: 0, md: 4 }}
            mt={{ xs: 3, sm: 3, md: 0 }}
          >
            <Typography
              variant="h4"
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  sm: '1.8rem',
                  md: '2.2rem',
                },
              }}
            >
              Enhance your coding experience.
            </Typography>
            <Typography
              variant="body1"
              mt={2}
              mb={{ xs: 2, sm: 2, md: 0 }}
              sx={{
                fontSize: {
                  xs: '1rem',
                  sm: '1rem',
                  md: '1.2rem',
                },
                fontWeight: 400,
                color: '#86909c',
              }}
            >
              Experience syntax highlighting and IntelliSense in over 50
              languages for enhanced productivity.
            </Typography>
          </Box>
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={intellisense}
              alt="intellisense"
              style={{
                width: '100%',
                maxHeight: '450px',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Box>
      </motion.div>
    </ThemeProvider>
  );
};

export default FourthSection;
