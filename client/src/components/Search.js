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
// import { LocalLaundryService } from '@mui/icons-material';

import CourseInfo from './CourseInfo'

export default function ResponsiveAppBar({professor, courses}) {
  const [searched, setSearched] = React.useState('');

  const [professorSelected, setProfessorSelected] = React.useState('');

  const [level, setLevel] = React.useState();

  const [geography, setGeography] = React.useState('');

  // const [initialState, setInitialState] = React.useState(true);

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
    search: false,
  })


  const allCourses = courses;
  
  const filtersMap = {
    "diap": "is_DIAP",
    "writ": "is_WRIT",
    "rem": "is_remote",
    "p": "is_Premodern",
    "intro": "is_intro",
    "fys": "is_FYS",
    "sys": "is_SYS",
    "capstone": "is_capstone",
    "lecture": "is_lecture",
  }

  const sortByProf = (courses, prof) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      if (l.professors[0]['displayName'] === prof) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const sortByLevel = (courses, lev) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      console.log(l);
      if (l.is_undergrad === lev) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const sortByGeo = (courses, geo) => {
    const sortedList = [];
    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      console.log(l);
      if (l.geography === geo) {
        sortedList.push(l);
      } 
    }
    return sortedList
  }

  const trueFilters = () => {
    var trueFilt = []
    for (const [key, value] of Object.entries(filters)) {
      if (value) {
        trueFilt.push(key)
      }
    }
    return trueFilt
  }

  const sortByFilters = (courses, filtersDict) => {
    const sortedList = [];
    var filtersList = trueFilters();

    var mappedList = filtersList.map(x => filtersMap[x])
    console.log(mappedList);
    console.log(courses);

    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      console.log(l);
      var add = true; 

      for (var j = 0, len2 = mappedList.length; j < len2; j++) {
        console.log(l[mappedList[j]]);
        if (l[mappedList[j]] !== true) {
          add = false;
        }
      }
      
      if (add) {
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
    for (const [, value] of Object.entries(consider)) {
      if (value) {
        return false
      }
    }
    return true
  }

  // const filtersSelected = () => {
  //   for (const [key, value] of Object.entries(filters)) {
  //     if (value) {
  //       return true
  //     }
  //   }
  //   return false
  // }

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

      console.log(toSort);
      if (consider['search']) {
        toSort = sortBySearched(toSort, searched)
      }

      return toSort;
    }  
  }

  const selectProfessor = (event) => {
    if (event.target.value === "All") {
      setProfessorSelected(event.target.value);
      setConsider({
        ...consider,
        ['professor']: false,
      });
    } else {
      setProfessorSelected(event.target.value);
      setConsider({
        ...consider,
        ['professor']: true,
      });
    }
  };

  const selectLevel = (event) => {
    if (event.target.value === "Undergraduate") {
      setLevel(true);
      setConsider({
        ...consider,
        ['level']: true,
      });
    }
    else if (event.target.value === "Graduate") {
      setLevel(false);
      setConsider({
        ...consider,
        ['level']: true,
      });
    }
    else if (event.target.value === "All") {
      setConsider({
        ...consider,
        ['level']: false,
      });
    }
  };

  const selectGeography = (event) => {
    if (event.target.value === "All") {
      setGeography(event.target.value);
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
    setConsider({
      ...consider,
      ['filters']: true,
      })
  };

  const selectSearched = (event) => {
    if (event.target.value === "") {
      setSearched(event.target.value)
      setConsider({
        ...consider,
        ['search']: false,
        })
    } else {
      setSearched(event.target.value)
      setConsider({
        ...consider,
        ['search']: true,
        })
    }
    console.log(searched);
  };

  const sortBySearched = (courses, searchString) => {
    var lowerArr = searchString.split(" ").map(element => element.toLowerCase());
    console.log(lowerArr);
    const sortedList = [];

    for (var i = 0, len = courses.length; i < len; i++) {
      var l = courses[i];
      console.log(l);
      var courseString = l['course_title'];
      var noPunc = courseString.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
      var finalString = noPunc.replace(/\s{2,}/g," ");
      console.log(finalString);
      var stringArr = finalString.split(" ").map(element => element.toLowerCase())
      console.log(stringArr);

      for (var j = 0, len2 = lowerArr.length; j < len2; j++) {
          if (stringArr.includes(lowerArr[j])) {
            sortedList.push(l);
          }
      }
    }
    //make hashset
    return sortedList
  }

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
            <CourseInfo course={course} status={false} edit={false} approve={false}/>
        ))
        }
    </div>
  );
};