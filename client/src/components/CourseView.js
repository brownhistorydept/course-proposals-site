import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { LocalLaundryService } from '@mui/icons-material';

import CourseInfo from './CourseInfo'

export default function CourseView({course}) {
  const [searched, setSearched] = React.useState('');

  const [professorSelected, setProfessorSelected] = React.useState('');

  const [level, setLevel] = React.useState();

  const [geography, setGeography] = React.useState('');

  const [initialState, setInitialState] = React.useState(true);

  const [filters, setFilters] = React.useState({
    rpp: false,
    writ: false,
    rem: false,
    p: false,
    intro: false, 
    fys: false, 
    sys: false, 
    capstone: false, 
    lecture: false, 
  })

  const [consider, setConsider] = React.useState({
    professor: false,
    level: false,
    geography: false,
    filters: false,
    search: false,
  })

  
  // const courses = [
//   {course_number: "HIST 0250", 
//       course_title: "American Exceptionalism: The History of an Idea", 
//       professors: [{displayName: "Michael Vorenberg"}],
//       crn: 24823,
//       semester: "Spring",
//       year: 2021,
//       is_RPP: true,
//       is_WRIT: true,
//       is_Premodern: true,
//       geography: "North America",
//       is_remote: true,
//       is_undergrad: true,
//       is_intro: true,
//   },
//   {course_number: "HIST 0150D", 
//       course_title: "Refugees: A Twentieth-Century History",
//       professors: [{displayName: "Vazira F-Y Zamindar"}],
//       crn: 12312,
//       semester: "Fall",
//       year: 2022,
//       is_RPP: false,
//       is_WRIT: true,
//       is_Premodern: false,
//       geography: "Europe",
//       is_remote: true,
//       is_undergrad: false,
//       is_intro: true,
//   },
//   {course_number: "HIST 0150G", 
//       course_title: "History of Law: Great Trials", 
//       professors: [{displayName: "Holly A Case"}],
//       crn: 32321,
//       semester: "Spring",
//       year: 2022,
//       is_RPP: false,
//       is_WRIT: false,
//       is_Premodern: false,
//       geography: "MESA",
//       is_remote: true,
//       is_undergrad: true,
//       is_intro: true,
//   }
// ]

  const allCourses = courses;
  
  const filtersMap = {
    "rpp": "is_RPP",
    "writ": "is_WRIT",
    "rem": "is_remote",
    "p": "is_Premodern",
    "intro": "is_intro",
    "fys": "is_FYS",
    "sys": "is_SYS",
    "capstone": "is_capstone",
    "lecture": "is_lecture",
  }
  

  return (
    <div align='left'> 
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
          }}>
        <br/>
        <Box
            sx={{
            width: 1030,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}> 
          <Typography variant="h3">
              Course Catalog
          </Typography>
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
                  onChange={selectSearched}
                  size="small"
                  style = {{width: 900}}
                />
                <br/>
              </div>
            </Box>
            <Button style={{maxHeight: '40px', marginTop: 32}} variant="outlined">Search</Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, marginLeft:1, p: 0, border: '0px solid', marginBottom: 2}}>
          <Box sx={{display: 'grid', paddingLeft: 1, width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)'}}>
              
              <div>
                <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Professor</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue="All"
                    value={professorSelected}
                    label="Professor"
                    onChange={selectProfessor}
                    sx = {{height:30, padding: 0, border: 0 }}
                  > 
                    <MenuItem value="All">All</MenuItem>
                    {professor.map((prof) => (
                      <MenuItem value={prof}>
                        {prof.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Level</InputLabel>
                  <Select
                    defaultValue=""
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={level}
                    label="Level"
                    onChange={selectLevel}
                    sx = {{height:30, padding: 0, border: 0 }}
                  > 
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                    <MenuItem value="Graduate">Graduate</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Geography</InputLabel>
                  <Select
                    defaultValue="All"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue={""}
                    value={geography}
                    label="Geography"
                    onChange={selectGeography}
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
          </Box>
          <Box sx={{ display: 'flex', paddingLeft: 10, marginLeft:12, width: 1, gap: 0, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
            <Box sx={{ display: 'flex', height: 50, }}>
              <FormControl sx={{ m: 0}} component="fieldset" variant="standard">
                <FormGroup row={true}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={rpp} onChange={selectFilters} name="rpp" />
                    }
                    label="RPP"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={writ} onChange={selectFilters} name="writ" />
                    }
                    label="WRIT"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={rem} onChange={selectFilters} name="rem" />
                    }
                    label="REM"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={p} onChange={selectFilters} name="p" />
                    }
                    label="P"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={intro} onChange={selectFilters} name="intro" />
                    }
                    label="Intro"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={fys} onChange={selectFilters} name="fys" />
                    }
                    label="FYS"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={sys} onChange={selectFilters} name="sys" />
                    }
                    label="SYS"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={capstone} onChange={selectFilters} name="capstone" />
                    }
                    label="Capstone"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={lecture} onChange={selectFilters} name="lecture" />
                    }
                    label="Lecture"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Box> 
        </Box>  
        <Box
            sx={{
            width: 1,
            height: 50,
            margin: 0,
            paddingLeft: 2,
          }}> 
          <Typography variant="h5">
              ___________________________________________________________________________________________________
          </Typography>
        </Box>
      </Box>
      {sort().map((course, index) => (
            <CourseInfo course={course} status={false}/>
        ))
        }
    </div>
  );
};