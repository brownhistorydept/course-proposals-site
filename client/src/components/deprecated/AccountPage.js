import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import AccountInput from './AccountInput'


const font = "'Open Sans', sans-serif";
const theme = createTheme({
    typography: {
      fontFamily: font,
    }
  });


const AccountPage = () => {  
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
              Course Proposal
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', width: 0.8, margin: "auto", p: 0, border: '0px solid'}}>
          <Box sx={{display: 'grid', width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(2, 1fr)'}}> 
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='left' marginTop='20'>
                        Course Number 
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Course Title
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Professor
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        CRN
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Date
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Level
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Region
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
            <Box sx={{m:1, border:0}}>
                <ThemeProvider theme={theme}>
                    <Typography variant="h8" align='right' marginTop='20'>
                        Course Description
                    </Typography>
                </ThemeProvider>
            </Box>
            <AccountInput/>
          </Box>
        </Box>  
        <Box
            sx={{
            width: 1,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}> 
        </Box>
      </Box>
      
    </div>
  );
};
export default AccountPage;