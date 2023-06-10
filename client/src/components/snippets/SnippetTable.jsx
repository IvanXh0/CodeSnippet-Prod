import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  IconButton,
  Tooltip,
} from '@mui/material';
import { formatDate } from '../../utils/dateUtils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DeleteModal from './DeleteModal';

const SnippetTable = ({
  snippets,
  handleEditSnippet,
  handleOpenSnippetInEditor,
  handleDeleteSnippet,
  handleCopyLink,
}) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState(null);

  const handleOpenDeleteModal = snippetId => {
    setSnippetToDelete(snippetId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSnippetToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    if (snippetToDelete) {
      handleDeleteSnippet(snippetToDelete);
      setSnippetToDelete(null);
      setDeleteModalOpen(false);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="snippet table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: '#979797',
                fontWeight: '500',
                fontSize: '15px',
                padding: '16px',
              }}
              align="left"
            >
              Title
            </TableCell>
            <TableCell
              sx={{ color: '#979797', fontWeight: '500', fontSize: '15px' }}
              align="left"
            >
              Language
            </TableCell>
            <TableCell
              sx={{ color: '#979797', fontWeight: '500', fontSize: '15px' }}
              align="left"
            >
              Last Edited
            </TableCell>
            <TableCell
              sx={{ color: '#979797', fontWeight: '500', fontSize: '15px' }}
              align="left"
            ></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {snippets.map(snippet => (
            <TableRow
              sx={{ cursor: 'pointer', zIndex: '1' }}
              hover
              onClick={() => handleEditSnippet(snippet._id)}
              key={snippet._id}
            >
              <TableCell
                sx={{ fontSize: '16px', padding: '20px' }}
                width={250}
                align="left"
                scope="row"
              >
                {snippet.title}
              </TableCell>
              <TableCell sx={{ fontSize: '16px' }} width={250} align="left">
                {snippet.language}
              </TableCell>
              <TableCell sx={{ fontSize: '16px' }} width={250} align="left">
                {formatDate(snippet.updatedAt)}
              </TableCell>
              <TableCell>
                <Tooltip title="Open in Editor">
                  <IconButton
                    color="info"
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenSnippetInEditor(snippet._id);
                    }}
                  >
                    <OpenInNewIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Snippet">
                  <IconButton
                    color="error"
                    onClick={e => {
                      e.stopPropagation();
                      handleOpenDeleteModal(snippet._id); // Open the delete modal
                    }}
                  >
                    <DeleteForeverIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Copy Link">
                  <IconButton
                    color="secondary"
                    onClick={e => {
                      e.stopPropagation();
                      handleCopyLink(snippet._id);
                    }}
                  >
                    <CopyAllIcon fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <DeleteModal
        open={deleteModalOpen}
        handleClose={handleCloseDeleteModal}
        handleConfirm={handleConfirmDelete}
      />
    </TableContainer>
  );
};

export default SnippetTable;
