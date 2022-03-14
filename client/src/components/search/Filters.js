import * as React from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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

  const {diap, writ, p, fys, sys, capstone, lecture, intro, rem} = state;

  return (
    <Box sx={{ display: 'flex', height: 50, }}>
      <FormControl sx={{ m: 0}} component="fieldset" variant="standard">
        <FormGroup row={true}>
          <FormControlLabel
            control={
              <Checkbox checked={diap} onChange={handleChange} name="diap" />
            }
            label="DIAP"
          />
          <FormControlLabel
            control={
              <Checkbox checked={writ} onChange={handleChange} name="writ" />
            }
            label="WRIT"
          />
          <FormControlLabel
            control={
              <Checkbox checked={rem} onChange={handleChange} name="rem" />
            }
            label="REM"
          />
          <FormControlLabel
            control={
              <Checkbox checked={p} onChange={handleChange} name="P" />
            }
            label="P"
          />
          <FormControlLabel
            control={
              <Checkbox checked={intro} onChange={handleChange} name="intro" />
            }
            label="Intro"
          />
          <FormControlLabel
            control={
              <Checkbox checked={fys} onChange={handleChange} name="fys" />
            }
            label="FYS"
          />
          <FormControlLabel
            control={
              <Checkbox checked={sys} onChange={handleChange} name="sys" />
            }
            label="SYS"
          />
          <FormControlLabel
            control={
              <Checkbox checked={capstone} onChange={handleChange} name="capstone" />
            }
            label="Capstone"
          />
          <FormControlLabel
            control={
              <Checkbox checked={lecture} onChange={handleChange} name="lecture" />
            }
            label="Lecture"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}