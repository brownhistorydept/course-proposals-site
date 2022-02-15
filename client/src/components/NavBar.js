import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const pages = ['Course Catalog', 'My Courses', 'Account'];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={{ background: '#992525' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box
            component="img"
            sx={{
            height: 50,
            width: 40,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
            marginRight: 2,
            }}
            alt="brown icon"
            src= "https://www.logolynx.com/images/logolynx/s_6a/6a11e8656b9479ce79f736dc17078b7e.png"
          />

          <Typography
            variant="h8"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex'} }}
          >
            Department of History Course Proposals
          </Typography>

          <Box sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', marginRight:3 }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;