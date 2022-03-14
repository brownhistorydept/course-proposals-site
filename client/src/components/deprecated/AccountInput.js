import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function AccountInput() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch', border: 0, },

      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-size-small"
          size="small"

          
          style = {{width: 800}}
        />
        <br/>
      </div>
    </Box>
  );
}