import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useStore } from '../hooks/useStore';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { AuthContext } from '../auth/AuthContext';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import logo from '../assets/logo2.png';

const pages = [
  {
    name: 'My Vault',
    link: '/snippets',
  },
];

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { authData, setAuthData } = useStore();
  const { login, logout } = useContext(AuthContext);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    googleLogout(); // Logout using the appropriate method
    localStorage.removeItem('AuthData'); // Remove auth data from local storage
    localStorage.removeItem('acessToken');
    logout();
    setAuthData(null); // Clear auth data in state
    window.location.href = '/';
  };

  return (
    <AppBar
      sx={{ boxShadow: 'none', backdropFilter: 'blur(5px)' }}
      color="transparent"
      position="sticky"
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img width={35} src={logo} alt="Logo" style={{ marginRight: 8 }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'black',
              }}
            >
              CodeSnippet
            </Typography>
          </Box>

          {/* Mobile Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    sx={{ textDecoration: 'none', color: 'black' }}
                    as={Link}
                    to={page.link}
                    textAlign="center"
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop Navigation Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              marginRight: 5,
            }}
          >
            {authData && (
              <>
                <Button
                  variant="contained"
                  component={Link}
                  to="/snippets"
                  sx={{
                    background:
                      'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    color: 'white',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                    '&:hover': {
                      background:
                        'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
                    },
                  }}
                >
                  <EnhancedEncryptionIcon sx={{ mr: 1 }} />
                  My Vault
                </Button>
              </>
            )}
          </Box>

          {/* User Settings */}
          <Box sx={{ flexGrow: 0, textAlign: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {authData ? (
                  <Avatar alt={authData.name} src={authData.picture} />
                ) : (
                  <Avatar alt="User" src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Typography variant="h6" noWrap>
              {authData && authData.name.split(' ')[0]}
            </Typography>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!authData && (
                <GoogleLogin
                  useOneTap={true}
                  onSuccess={async credentialResponse => {
                    const { data } = await axios.post(
                      'https://codesnippet-prod.onrender.com/api/auth/login',
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    localStorage.setItem('AuthData', JSON.stringify(data));
                    setAuthData(data);
                    localStorage.setItem('acessToken', data.accessToken);
                    login(data.accessToken);
                    window.location.reload();
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              )}
              {authData && (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
