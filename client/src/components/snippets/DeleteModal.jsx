import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Modal, Typography } from '@mui/material';

const DeleteModal = ({ open, handleClose, handleConfirm, anchorEl }) => {
  const handleDelete = () => {
    handleConfirm();
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
              maxWidth: '400px',
            }}
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                id="modal-title"
                gutterBottom
              >
                Are you sure you want to delete this snippet?
              </Typography>
              <Typography variant="body1" gutterBottom>
                This action cannot be undone.
              </Typography>
            </Box>

            <Box display="flex" justifyContent="flex-end" marginTop="2rem">
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}
                style={{ marginRight: '1rem' }}
              >
                Cancel
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            </Box>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal;
