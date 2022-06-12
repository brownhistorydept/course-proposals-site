import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';

import CourseCard from './CourseCard'

export default function Search({allProfessors, courses, user}) {

  const [searched, setSearched] = React.useState('');

  const [professorSelected, setProfessor] = React.useState('');

  const [level, setLevel] = React.useState();

  const [geography, setGeography] = React.useState('');

  const [year, setYear] = React.useState(new Date().getFullYear());
  // not sure having it default to the default year makes sense, but with '' react thinks its a string so === test fails

  const [designations, setDesignations] = React.useState({
    is_RPP: false,
    is_WRIT: false,
    is_CBLR: false,
    is_Premodern: false,
    is_FYS: false,
    is_SYS: false,
    is_capstone: false,
    is_lecture: false,
    is_intro: false,
    is_remote: false,
  })

  const [consider, setConsider] = React.useState({
    year: true,
    professor: false,
    level: false,
    geography: false,
    designations: false,
    search: false,
  })

  const allCourses = courses;

  const considerNone = () => {
    for (const [, value] of Object.entries(consider)) {
      if (value) {
        return false
      }
    }
    return true
  }

  const filter = () => {
    // console.log(consider);
    // console.log(designations)
    if (considerNone()) {
      return allCourses
    } else {
      var toFilter = allCourses
      console.log(allCourses);

      if (consider['year']) {
        toFilter = toFilter.filter(course => course.year === year);
      }

      if (consider['professor']) {
        toFilter = toFilter.filter(course => course.professors[0]['displayName'] === professorSelected);
      }
      
      if (consider['level']) {
        toFilter = toFilter.filter(course => course.is_undergrad === level);
      }

      if (consider['geography']) {
        toFilter = toFilter.filter(course => course.geography === geography);
      }

      if (consider['designations']) {
        const trueDesignations = Object.entries(designations).filter(([_, value]) => value);
        toFilter = toFilter.filter(course => trueDesignations.every(designation => course[designation[0]]));
      }

      if (consider['search']) {
        toFilter = filterBySearched(toFilter, searched)
      }

      return toFilter;
    }  
  }

  const selectProfessor = (event) => {
    if (event.target.value === "All") {
      setProfessor(event.target.value);
      setConsider({
        ...consider,
        'professor': false,
      });
    } else {
      setProfessor(event.target.value);
      setConsider({
        ...consider,
        'professor': true,
      });
    }
  };

  const selectYear = (event) => {
    if (event.target.value === "") {
      // setYear(new Date().getFullYear());
      setConsider({
        ...consider,
        'year': false,
      });
    } else {
      setYear(parseInt(event.target.value));
      setConsider({
        ...consider,
        'year': true,
      });
    }
  }

  const selectLevel = (event) => {
    if (event.target.value === "Undergraduate") {
      setLevel(true);
      setConsider({
        ...consider,
        'level': true,
      });
    }
    else if (event.target.value === "Graduate") {
      setLevel(false);
      setConsider({
        ...consider,
        'level': true,
      });
    }
    else if (event.target.value === "All") {
      setConsider({
        ...consider,
        'level': false,
      });
    }
  };

  const selectGeography = (event) => {
    if (event.target.value === "All") {
      setGeography(event.target.value);
      setConsider({
        ...consider,
        'geography': false,
      });
    } else {
      setGeography(event.target.value);
      setConsider({
        ...consider,
        'geography': true,
      });
    }
  };

  const selectFilters = (event) => {
    setDesignations({
      ...designations,
      [event.target.name]: event.target.checked,
    });
    setConsider({
      ...consider,
      'designations': true,
      })
  };

  const selectSearched = (event) => {
    if (event.target.value === "") {
      setSearched(event.target.value)
      setConsider({
        ...consider,
        'search': false,
        })
    } else {
      setSearched(event.target.value)
      setConsider({
        ...consider,
        'search': true,
        })
    }
  };

  const filterBySearched = (courses, searchString) => {
    var lowerArr = searchString.split(" ").map(element => element.toLowerCase());
    const filteredList = [];

    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      var courseString = l['course_title'];
      var noPunc = courseString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      var finalString = noPunc.replace(/\s{2,}/g," ");
      var stringArr = finalString.split(" ").map(element => element.toLowerCase())

      for (var j = 0, len2 = lowerArr.length; j < len2; j++) {
          if (stringArr.includes(lowerArr[j]) && !filteredList.includes(l)) {
            filteredList.push(l);
          }
      }
    }
    //make hashset
    return filteredList
  }

  const {is_RPP, is_WRIT, is_CBLR, is_Premodern, is_FYS, is_SYS, is_capstone, is_lecture, is_intro, is_remote} = designations;

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
                  fullWidth
                  id="outlined-size-small"
                  onChange={selectSearched}
                  size="small"
                  style = {{width: 1010}}
                />
                <br/>
              </div>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, marginLeft:1, p: 0, border: '0px solid', marginBottom: 2}}>
          <Box sx={{display: 'grid', paddingLeft: 1, width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
              
              <div>
                <FormControl sx={{ m: 1, minWidth: 120}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Professor</InputLabel>
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
                    {allProfessors?.map((prof) => (
                      <MenuItem value={prof} key={prof}>
                        {prof.displayName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <FormControl sx={{ m: 1, minWidth: 120}} size="small">
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
                <FormControl sx={{ m: 1, minWidth: 120, height:20}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Geography</InputLabel>
                  <Select
                    defaultValue="All"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
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
                    <MenuItem value="MESA">Middle East - South Asia</MenuItem>
                    <MenuItem value="North America">North America</MenuItem>
                    <MenuItem value="Global">Global</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <TextField
                  label="Year"
                  id="outlined-size-small"
                  onChange={selectYear}
                  defaultValue={year}
                  size="small"
                  style = {{minWidth:120}}
                />
              </div>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', paddingLeft: 3, width: 1, gap: 0, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
            <Box sx={{ display: 'flex', height: 50, }}>
              <FormControl sx={{ m: 0}} component="fieldset" variant="standard">
                <FormGroup row={true}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_RPP} onChange={selectFilters} name="is_RPP" />
                    }
                    label="Race, Power, & Privilege (RPP)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_WRIT} onChange={selectFilters} name="is_WRIT" />
                    }
                    label="WRIT"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_CBLR} onChange={selectFilters} name="is_CBLR" />
                    }
                    label="Community-Based Learning & Research (CBLR)"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_Premodern} onChange={selectFilters} name="is_Premodern" />
                    }
                    label="Premodern"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_FYS} onChange={selectFilters} name="is_FYS" />
                    }
                    label="First-Year Seminar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_SYS} onChange={selectFilters} name="is_SYS" />
                    }
                    label="Second-Year Seminar"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_capstone} onChange={selectFilters} name="is_capstone" />
                    }
                    label="Capstone"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_lecture} onChange={selectFilters} name="is_lecture" />
                    }
                    label="Lecture"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_intro} onChange={selectFilters} name="is_intro" />
                    }
                    label="Intro"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox checked={is_remote} onChange={selectFilters} name="is_remote" />
                    }
                    label="Remote"
                  />
                </FormGroup>
              </FormControl>
            </Box>
          </Box> 
        <Box
            sx={{
            width: 1,
            height: 50,
            margin: 0,
            paddingLeft: 2,
            paddingTop: 2,
          }}> 
          <Typography variant="h5">
              ___________________________________________________________________________________________________
          </Typography>
        </Box>
      </Box>
      {filter().map((course, index) => (
            <CourseCard course={course} status={false} edit={false} approve={false} new_proposal={user?.role !== "default"}/>
        ))
        }
    </div>
  );
};