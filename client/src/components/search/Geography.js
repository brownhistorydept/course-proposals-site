import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function SelectLabels() {
  const [geography, setGeography] = React.useState('');

  const handleChange = (event) => {
    setGeography(event.target.value);
  };

  const geographies = ["All", "Africa", "East Asia", "Europe", "Latin America", "MESA", "North America", "Global"]
 
  return (
    <div>
      <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
      <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Geography</InputLabel>
        <Select
          defaultValue="All"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={geography}
          label="Geography"
          onChange={handleChange}
          sx = {{height:30, padding: 0, border: 0 }}
        > 
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="East Asia">East Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Latin America">Latin America</MenuItem>
          <MenuItem value="MESA">MESA</MenuItem>
          <MenuItem value="North America">North America</MenuItem>
          <MenuItem value="Global">Global</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}