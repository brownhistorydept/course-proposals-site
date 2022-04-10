import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import ProfDropdown from './search/Professor';
import LevelDropdown from './search/Level';
import GeoDropdown from './search/Geography';
import Filters from './search/Filters';
import SearchBar from './search/SearchBar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import * as React from 'react';
import { LocalLaundryService } from '@mui/icons-material';

import CourseInfo from './CourseInfo'

export default function ResponsiveAppBar({professor, courses}) {
  const [searched, setSearched] = React.useState('');

  const [professorSelected, setProfessorSelected] = React.useState('');

  const [level, setLevel] = React.useState();

  const [geography, setGeography] = React.useState('');

  const [initialState, setInitialState] = React.useState(true);

  const [filters, setFilters] = React.useState({
    diap: false,
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
  })

  

  // const courses = [
//   {course_number: "HIST 0250", 
//       course_title: "American Exceptionalism: The History of an Idea", 
//       professors: [{displayName: "Michael Vorenberg"}],
//       crn: 24823,
//       semester: "Spring",
//       year: 2021,
//       is_DIAP: true,
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
//       is_DIAP: false,
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
//       is_DIAP: false,
//       is_WRIT: false,
//       is_Premodern: false,
//       geography: "MESA",
//       is_remote: true,
//       is_undergrad: true,
//       is_intro: true,
//   }
// ]

  const allCourses = courses;

  const sortByProf = (courses, prof) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = allCourses[i];
      if (l.professors[0]['displayName'] == prof) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const sortByLevel = (courses, lev) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = allCourses[i];
      console.log(l);
      if (l.is_undergrad == lev) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const sortByGeo = (courses, geo) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = allCourses[i];
      console.log(l);
      if (l.geography == geo) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const sortByFilters = (courses, filtersDict) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = allCourses[i];
      if (l.is_DIAP == filtersDict.diap && l.is_WRIT == filtersDict.writ && l.is_remote == filtersDict.rem 
        && l.is_Premodern == filtersDict.p && l.is_intro == filtersDict.intro) {
          sortedList.push(l);
        } 
    }
    return sortedList
  }

  // React.useEffect(() => {
  //   myFunction();
  //   return () => {
  //     setInitialState({}); // This worked for me
  //   };
  // }, []);

  // const myFunction = () => {
  //     setInitialState(false)
  // }


  // useEffect(() => {
  //   let isMounted = true;
  //   fetchValue().then(() => {
  //         if(isMounted ){
  //           setInitialState(false); // no more error
  //         } 
  //       });
  //      return () => {
  //       isMounted = false;
  //       };
  //   }, []);

  const considerNone = () => {
    for (const [key, value] of Object.entries(consider)) {
      if (value) {
        return false
      }
    }
    return true
  }

  const filtersSelected = () => {
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        return true
      }
    }
    return false
  }

  const sort = () => {
    if (considerNone()) {
      // this.initialState = false;
      // setInitialState(false);
      return allCourses
    } else {
      // const sortedList = [];
      // for (var i = 0, len = allCourses.length; i < len; i++) {
      //     var l = allCourses[i];
      //     if (l.professors == professorSelected && l.geography == geography) {
      //       if ((l.is_undergrad && level == "Undergraduate") || (!l.is_undergrad && level == "Graduate")) {
      //           console.log(l);
      //           if (l.is_DIAP == filters.diap && l.is_WRIT == filters.writ && l.is_remote == filters.rem 
      //             && l.is_Premodern == filters.p && l.is_intro == filters.intro) {
      //               sortedList.push(l);
      //             } 
      //       }
      //     }
      // }
      var toSort = allCourses

      if (consider['professor']) {
        toSort = sortByProf(toSort, "Tharit Ngamprasertsith")
        // professorSelected
      }
      
      if (consider['level']) {
        toSort = sortByLevel(toSort, level)
      }

      if (consider['geography']) {
        toSort = sortByGeo(toSort, geography)
      }

      if (consider['filters']) {
        toSort = sortByFilters(toSort, filters)
      }

      return toSort;
    }  
  }

  const selectProfessor = (event) => {
    setProfessorSelected(event.target.value);
    setConsider({
      ...consider,
      ['professor']: true,
    });
  };

  const selectLevel = (event) => {
    if (event.target.value == "Undergraduate") {
      setLevel(true);
      setConsider({
        ...consider,
        ['level']: true,
      });
    }
    else if (event.target.value == "Graduate") {
      setLevel(false);
      setConsider({
        ...consider,
        ['level']: true,
      });
    }
    else if (event.target.value == "All") {
      setConsider({
        ...consider,
        ['level']: false,
      });
    }
  };

  const selectGeography = (event) => {
    if (event.target.value == "All") {
      setConsider({
        ...consider,
        ['geography']: false,
      });
    } else {
      setGeography(event.target.value);
      setConsider({
        ...consider,
        ['geography']: true,
      });
    }
  };

  const selectFilters = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });

    console.log(filters)

    if (filtersSelected()) {
      setConsider({
        ...consider,
        ['filters']: true,
      });
    } else {
      setConsider({
        ...consider,
        ['filters']: false,
      });
    }
    
  };

  const {diap, writ, rem, p, intro, fys, sys, capstone, lecture} = filters;

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
          <SearchBar/>
        </Box>
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, marginLeft:1, p: 0, border: '0px solid', marginBottom: 2}}>
          <Box sx={{display: 'grid', paddingLeft: 1, width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)'}}>
              
              <div>
                <FormControl sx={{ m: 1, width: 120, height:20}} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height:1, border:0, padding:0, fontSize: 14}} id="demo-simple-select-helper-label">Professor</InputLabel>
                  <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue=""
                    value={professorSelected}
                    label="Professor"
                    onChange={selectProfessor}
                    sx = {{height:30, padding: 0, border: 0 }}
                  > 
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
                    defaultValue="All"
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    defaultValue=""
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
                      <Checkbox checked={diap} onChange={selectFilters} name="diap" />
                    }
                    label="DIAP"
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
            <CourseInfo course={course}/>
        ))
        }
    </div>
  );
};