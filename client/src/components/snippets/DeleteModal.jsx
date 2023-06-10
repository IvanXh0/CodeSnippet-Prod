import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Modal, Typography } from '@mui/material';

const DeleteModal = ({ open, handleClose, handleConfirm }) => {
  const handleDelete = () => {
    handleConfirm();
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight="medium" id="modal-title">
                Are you sure you want to delete this snippet?
              </Typography>
              <Typography variant="body1">
                This action cannot be undone.
              </Typography>
            </Box>

            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
              <Button variant="outlined" color="primary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                style={{ marginLeft: '1rem' }}
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
