import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as React from 'react';

export default function TextFieldSizes() {
  const [searchText, setSearchText] = React.useState('');

  const handleChange = (event) => {
    
  };

  return (
    <div> 
      <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)'}}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, marginTop: 4, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="Search by Course Name"
              id="outlined-size-small"
              // onChange={}
              size="small"
              style = {{width: 900}}
            />
            <br/>
          </div>
        </Box>
        <Button style={{maxHeight: '40px', marginTop: 32}} variant="outlined">Search</Button>
      </Box>
    </div>
    
  );
}