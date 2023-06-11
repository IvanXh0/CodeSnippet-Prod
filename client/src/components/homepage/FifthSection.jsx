import React from 'react';
import { Box, ThemeProvider, Typography } from '@mui/material';
import image from '../../assets/compile.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { theme } from '../../utils/themeUtils';

const FifthSection = () => {
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: 'column', md: 'row' }}
          >
            <Box flex="1" textAlign={{ xs: 'center', md: 'left' }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: '1.8rem',
                    sm: '1.8rem',
                    md: '1.8rem',
                    lg: '2.2rem',
                  },
                }}
              >
                Compile your code effortlessly.
              </Typography>
              <Typography
                variant="body1"
                mt={2}
                sx={{
                  fontSize: {
                    xs: '1rem',
                    sm: '1rem',
                    md: '1.1rem',
                    lg: '1.2rem',
                  },
                  fontWeight: 400,
                  color: '#86909c',
                }}
              >
                With just a click of a button, you can write your code, run it,
                and easily debug any issues that arise.
              </Typography>
            </Box>
            <Box
              flex="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
              marginTop={{ xs: 3, md: 0 }}
            >
              <img
                src={image}
                alt="compile"
                style={{
                  width: '100%',
                  maxHeight: '340px',
                  objectFit: 'contain',
                }}
              />
            </Box>
          </Box>
        </motion.div>
      </ThemeProvider>
    </>
  );
};

export default FifthSection;
