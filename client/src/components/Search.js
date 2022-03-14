import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProfDropdown from './search/Professor';
import LevelDropdown from './search/Level';
import GeoDropdown from './search/Geography';
import Filters from './search/Filters';
import SearchBar from './search/SearchBar';


const ResponsiveAppBar = () => {

  return (
    <div align='left'> 
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
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
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, marginLeft:1, p: 0, border: '0px solid', marginBottom: 2}}>
          <Box sx={{display: 'grid', width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)'}}>
              <ProfDropdown/>
              <LevelDropdown/>
              <GeoDropdown/>
          </Box>
          <Box sx={{ display: 'flex', marginLeft:12, width: 1, gap: 0, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
              <Filters/> 
          </Box> 
        </Box>  
        <Box
            sx={{
            width: 1,
            height: 50,
            margin: 0,
            paddingLeft: 2,
          }}> 
          <Typography variant="h5">
              ___________________________________________________________________________________________________
          </Typography>
        </Box>
      </Box>
      
    </div>
  );
};
export default ResponsiveAppBar;