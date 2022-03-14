import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectLabels() {
  const [level, setLevel] = React.useState('');

  const handleChange = (event) => {
    setLevel(event.target.value);
  };

  const levels = ["All","Undergraduate", "Graduate"];
 
  return (
    <div>
      <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
      <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Level</InputLabel>
        <Select
          defaultValue="All"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={level}
          label="Level"
          onChange={handleChange}
          sx = {{height:30, padding: 0, border: 0 }}
        > 
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Undergraduate">Undergraduate</MenuItem>
          <MenuItem value="Graduate">Graduate</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}