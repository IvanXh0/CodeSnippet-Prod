import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import image from '../../assets/second-section.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../utils/themeUtils';

const SecondSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  const containerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          transition={{ duration: 0.3 }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontSize: {
                xs: '1.6rem',
                sm: '2rem',
                md: '2.3rem',
                lg: '2.8rem',
              },
            }}
          >
            Get started with coding right away, with no need to sign up.
          </Typography>
          <Typography
            variant="body1"
            mt={2}
            sx={{
              fontSize: {
                xs: '1.2rem',
                sm: '1.4rem',
                md: '1.5rem',
                lg: '1.6rem',
              },
              fontWeight: 400,
              color: '#86909c',
            }}
          >
            Simply log in and start coding!
          </Typography>
          <Box mt={5} sx={{ maxWidth: '100%', overflow: 'hidden' }}>
            <img
              src={image}
              alt="code snippet"
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </motion.div>
      </ThemeProvider>
    </>
  );
};

export default SecondSection;
