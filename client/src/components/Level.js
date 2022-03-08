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

  const levels = ["Level 1", "Level 2", "Level 3"];
 
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120, height:20}} size="small">
      <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Level</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={level}
          label="Level"
          onChange={handleChange}
          sx = {{height:30, padding: 0, border: 0 }}
        > 
          {levels.map((level) => (
            <MenuItem value={1}>
              {level}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}