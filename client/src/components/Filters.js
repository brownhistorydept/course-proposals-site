import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    coursenumber: false,
    coursetitle: false,
    crn: false,
    date: false,
    professor: false, 
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {coursenumber, coursetitle, crn, date, professor} = state;

  return (
    <Box sx={{ display: 'flex', height: 50, }}>
      <FormControl sx={{ m: 3, margin:0 }} component="fieldset" variant="standard">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox checked={coursenumber} onChange={handleChange} name="coursenumber" />
            }
            label="Course Number"
          />
          <FormControlLabel
            control={
              <Checkbox checked={coursetitle} onChange={handleChange} name="coursetitle" />
            }
            label="Course Title"
          />
          <FormControlLabel
            control={
              <Checkbox checked={crn} onChange={handleChange} name="crn" />
            }
            label="CRN"
          />
          <FormControlLabel
            control={
              <Checkbox checked={date} onChange={handleChange} name="date" />
            }
            label="Date"
          />
          <FormControlLabel
            control={
              <Checkbox checked={professor} onChange={handleChange} name="professor" />
            }
            label="Professor"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}