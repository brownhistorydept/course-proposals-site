import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectLabels() {
  const [professor, setProfessor] = React.useState('');

  const handleChange = (event) => {
    setProfessor(event.target.value);
  };

  const profs = ["Professor A", "Professor B", "Professor C"];
 
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, height:20}} size="small">
      <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Professor</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={professor}
          label="Professor"
          onChange={handleChange}
          sx = {{height:30, padding: 0, border: 0 }}
        > 
          {profs.map((prof) => (
            <MenuItem value={1}>
              {prof}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}