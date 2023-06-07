import { useEffect, useState } from 'react';
import {
  Badge,
  Box,
  IconButton,
  Typography,
  Container,
  TablePagination,
  Button,
} from '@mui/material';
import api from '../../auth/axiosInstance';
import SnippetEditor from './SnippetEditor';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import AddIcon from '@mui/icons-material/Add';
import SearchBar from './SearchBar';
import SnippetTable from './SnippetTable';
import SearchIcon from '@mui/icons-material/Search';
import { handleAddSnippet } from '../../utils/snippetUtils';
import { useNavigate } from 'react-router-dom';
import LoadingAnimation from '../LoadingAnimation';

const Snippets = () => {
  const [snippets, setSnippets] = useState([]);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/snippets');
      setSnippets(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchSearchQuery = async query => {
    try {
      const response = await api.get(`/api/snippets/search?query=${query}`);
      setSnippets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = event => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchSearchQuery(query);
  };

  useEffect(() => {
    if (searchQuery === '') {
      fetchSnippets();
    } else {
      fetchSearchQuery(searchQuery);
    }
  }, [searchQuery]);

  const handleEditSnippet = async snippetId => {
    try {
      const response = await api.get(`/api/snippets/${snippetId}`);
      setSelectedSnippet(response.data);
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSnippet = async snippetId => {
    try {
      await api.delete(`/api/snippets/${snippetId}`);
      fetchSnippets();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSnippet(null);
  };

  const handleOpenSnippetInEditor = snippetId => {
    const url = `https://code-snippet-prod.vercel.app/f/${snippetId}`;
    window.open(url, '_blank');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleBadgeClick = event => {
    setAnchorEl(event.currentTarget);
    setOpenPopover(true);
  };

  const handlePopoverClose = () => {
    setOpenPopover(false);
  };

  const handleCopyLink = snippetId => {
    navigator.clipboard.writeText(
      `https://code-snippet-prod.vercel.app/f/${snippetId}`
    );
  };

  const handleAddSnippetClick = () => {
    handleAddSnippet(navigate);
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedSnippets = snippets.slice(startIndex, endIndex);

  return (
    <>
      {loading && <LoadingAnimation />}
      <Container maxWidth="lg">
        <Box display="flex" mt={3} justifyContent="space-between">
          <Box>
            <Badge
              sx={{ mt: '10px', mb: '10px', marginRight: '10px' }}
              badgeContent={snippets.length}
              color="primary"
            >
              <FolderOpenIcon fontSize="large" />
            </Badge>
          </Box>
          <IconButton sx={{ mr: 4 }} color="primary" onClick={handleBadgeClick}>
            <SearchIcon fontSize="large" />
            <Typography variant="body1">Search</Typography>
          </IconButton>
          <Box flexGrow={1} />{' '}
          <Box>
            <Button
              sx={{
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                color: 'white',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                '&:hover': {
                  background:
                    'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                },
              }}
              onClick={handleAddSnippetClick}
            >
              <AddIcon fontSize="medium" />
              New Snippet
            </Button>
          </Box>
        </Box>

        <SearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          openPopover={openPopover}
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
        />
        <SnippetTable
          snippets={paginatedSnippets}
          handleEditSnippet={handleEditSnippet}
          handleOpenSnippetInEditor={handleOpenSnippetInEditor}
          handleDeleteSnippet={handleDeleteSnippet}
          handleCopyLink={handleCopyLink}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={snippets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>
      {selectedSnippet && (
        <SnippetEditor
          fetchSnippets={fetchSnippets}
          id={selectedSnippet._id}
          title={selectedSnippet.title}
          code={selectedSnippet.code}
          language={selectedSnippet.language}
          handleClose={handleClose}
          open={open}
        />
      )}
    </>
  );
};

export default Snippets;
