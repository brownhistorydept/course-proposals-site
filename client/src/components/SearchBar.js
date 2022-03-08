import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextFieldSizes() {
  return (
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
          label="Search by keyword"
          id="outlined-size-small"
          size="small"
          style = {{width: 1010}}
        />
        <br/>
      </div>
    </Box>
  );
}