import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FilterDropdown from './Professor';
import FilterDropdown2 from './Level';
import NavBar from './NavBar';
import Filters from './Filters';
import Item from './Item';
import SearchBar from './SearchBar';


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
    
    <div align='left'> 
      <Box sx={{
            margin: 'auto', marginTop: 4, width: 0.8, paddingLeft: 0, border:0
          }}>
        <br/>
        <Box
            sx={{
            width: 500,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}> 
          <Typography variant="h3">
              Course Catalog
          </Typography>
          <SearchBar/>
        </Box>
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, p: 0, border: '0px solid'}}>
          <Box sx={{display: 'grid', width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)'}}>
              <Item>Filter By:</Item>
              <FilterDropdown/>
              <FilterDropdown2/>
          </Box>
          <Box sx={{ display: 'flex', marginLeft:3, width: 1, gap: 0, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
              <Item>Sort By:</Item>
              <Filters/> 
          </Box> 
        </Box>  
        <Box
            sx={{
            width: 1,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}> 
          <Typography variant="h5">
              ________________________________________________________________________________________________
          </Typography>
        </Box>
      </Box>
      
    </div>
  );
};
export default ResponsiveAppBar;