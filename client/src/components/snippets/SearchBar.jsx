import { Box, Popover, TextField } from '@mui/material';

const SearchBar = ({
  searchQuery,
  handleSearch,
  openPopover,
  anchorEl,
  handlePopoverClose,
}) => {
  return (
    <Popover
      sx={{
        ml: 2,
      }}
      open={openPopover}
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'left',
      }}
    >
      <Box p={2}>
        <TextField
          sx={{
            borderRadius: '4px',
            width: '300px',
          }}
          label="Search by name or language"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Box>
    </Popover>
  );
};

export default SearchBar;
