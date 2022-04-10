import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as React from 'react';
import { fetchProfessors } from "../../utils/professors";
import { useEffect, useState } from "react";
// import { IUser } from "../../../../server/src/models/User";

export default function SelectLabels({professors}) {
  
  // const [, setError] = useState("");
  // const [professors, setProfessors] = useState<IUser>("");
  //   // called once when components on page have rendered
  //   useEffect(() => {
  //       async function getProfessors() {
  //           await fetchProfessors(setProfessors, setError);
  //       }
  //       getProfessors();
  //   }, []);

  const [professor, setProfessors] = React.useState('');

  const handleChange = (event) => {
    setProfessors(event.target.value);
    console.log(professor);
  };

  const profs = professors;
 
  return (
    <div>
      <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
      <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Professor</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={professor}
          label="Professor"
          onChange={handleChange}
          sx = {{height:30, padding: 0, border: 0 }}
        > 
          {professors.map((prof) => (
            <MenuItem value={prof}>
              {prof.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}