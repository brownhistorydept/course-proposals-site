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
import Profile from './Profile'
import { IUser } from '../../../server/src/models/User';

const pages = ['Course Catalog', 'My Courses'];

export default function NavBar(props: {
  user: IUser | undefined; }) {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event : any) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event : any) => {
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
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex'} }}
          >
            Department of History Course Proposals
          </Typography>
          
          {props.user && (
          <Box sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                key='Course Catalog'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', marginRight:3, textTransform :'none' }}
                href="/"
              >
                Course Catalog
              </Button>

              <Button
                key='My Courses'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', marginRight:3, textTransform :'none' }}
                href="/my_courses"
              >
                My Courses
              </Button>

              <Button
                key='Course Proposal'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', marginRight:3, textTransform :'none' }}
                href="/course_proposal"
              >
                Course Proposal
              </Button>

              {props.user.role==="manager" && <Button
                key='Approve Courses'
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', marginRight:3, textTransform :'none' }}
                href="/approve_courses"
              >
                Approve Courses
              </Button>}

            <Profile user={props.user}/>
          </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
