import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { motion } from 'framer-motion';

const LoadingAnimation = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <motion.div
        initial={{ opacity: 0, rotate: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <CircularProgress color="secondary" size={80} />
      </motion.div>
    </Box>
  );
};

export default LoadingAnimation;
