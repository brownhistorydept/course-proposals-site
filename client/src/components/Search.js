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

import CourseCard from './CourseCard';
import { GEO_REGIONS } from '../utils/constants';

export default function Search({ allProfessors, courses: allCourses, user }) {
  const [searched, setSearched] = React.useState('');
  const [professors, setProfessors] = React.useState([]);
  const [levels, setLevels] = React.useState([]);
  const [geographies, setGeographies] = React.useState([]);
  const [year, setYear] = React.useState(new Date().getFullYear());
  const [semesters, setSemesters] = React.useState([]);
  // not sure having it default to the default year makes sense, but with '' react thinks its a string so === test fails

  const [designations, setDesignations] = React.useState({
    is_RPP: false,
    is_WRIT: false,
    is_CBLR: false,
    is_premodern: false,
    is_remote_accessible: false,
    is_remote_only: false,
  })

  const [consider, setConsider] = React.useState({
    year: true,
    professor: false,
    levels: false,
    geography: false,
    designations: false,
    search: false,
  })

  const considerNone = () => {
    for (const [, value] of Object.entries(consider)) {
      if (value) {
        return false
      }
    }
    return true
  }

  const filter = () => {
    if (considerNone()) {
      return allCourses
    } else {
      var toFilter = allCourses

      if (consider['year']) {
        toFilter = toFilter.filter(course => course.year === year);
      }

      if (consider['semester']) {
        toFilter = toFilter.filter(course => semesters.some(sem => sem === course.semester));
      }

      if (consider['professor']) {
        toFilter = toFilter.filter(course => professors.some(profName => course.professors.some(p => p.displayName === profName)))
      }

      if (consider['levels']) {
        toFilter = toFilter.filter(course => levels.every(level => course.levels.includes(level)));
      }

      if (consider['geography']) {
        toFilter = toFilter.filter(course => geographies.every(geo => course.geography.includes(geo)));
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
    setProfessors(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    if (event.target.value.length === 0) {
      setConsider({
        ...consider,
        'professor': false,
      });
    } else {
      setConsider({
        ...consider,
        'professor': true,
      })
    }
  };

  const selectYear = (event) => {
    if (event.target.value === "") {
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

  const selectSemester = (event) => {
    setSemesters(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    if (event.target.value.length === 0) {
      setConsider({
        ...consider,
        'semester': false,
      });
    } else {
      setConsider({
        ...consider,
        'semester': true,
      })
    }
  };

  const selectLevel = (event) => {
    setLevels(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    console.log(event.target.value)
    if (event.target.value.length === 0) {
      setConsider({
        ...consider,
        'levels': false,
      });
    } else {
      setConsider({
        ...consider,
        'levels': true,
      })
    }
  };

  const selectGeography = (event) => {
    setGeographies(typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value);
    if (event.target.value.length === 0) {
      setConsider({
        ...consider,
        'geography': false,
      });
    } else {
      setConsider({
        ...consider,
        'geography': true,
      })
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
    return courses.filter(course => course.course_title.toLowerCase().includes(searchString.toLowerCase()));
  }

  const { is_RPP, is_WRIT, is_CBLR, is_premodern, is_remote_accessible, is_remote_only } = designations;

  return (
    <div align='left'>
      <Box sx={{
        margin: 'auto', marginTop: 4, maxWidth: 1060, paddingLeft: 0, border: 0
      }}>
        <br />
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
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
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
                  label="Search by Course Title"
                  fullWidth
                  id="outlined-size-small"
                  onChange={selectSearched}
                  size="small"
                  style={{ width: 1010 }}
                />
                <br />
              </div>
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: 1, marginTop: 3, marginLeft: 1, p: 0, border: '0px solid', marginBottom: 2 }}>
          <Box sx={{ display: 'grid', paddingLeft: 1, width: 0.3, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>

            <div>
              <FormControl sx={{ m: 1, minWidth: 120, marginTop: 0 }} size="small">
                <InputLabel sx={{ m: 0, margin: 0, border: 0, padding: 0, fontSize: 14 }} id="demo-simple-select-helper-label">Professor</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={professors}
                  label="Professor"
                  onChange={selectProfessor}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ padding: 0, border: 0 }}
                >
                  {allProfessors
                    ?.map(prof => prof.displayName)
                    ?.sort()
                    ?.map((profName, idx) => (
                      <MenuItem value={profName} key={idx}>
                        <Checkbox checked={professors.some(pName => pName === profName)} />
                        {profName}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120, marginTop: 0 }} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height: 1, border: 0, padding: 0, fontSize: 14 }}>Level</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={levels}
                  label="Level"
                  onChange={selectLevel}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value={'Undergraduate'}>
                    <Checkbox checked={levels.includes('Undergraduate')} />
                    Undergraduate
                  </MenuItem>
                  <MenuItem value={'Graduate'}>
                    <Checkbox checked={levels.includes('Graduate')} />
                    Graduate
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120, height: 20, marginTop: 0 }} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height: 1, border: 0, padding: 0, fontSize: 14 }}>Geography</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={geographies}
                  label="Geography"
                  onChange={selectGeography}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ padding: 0, border: 0 }}
                >
                  {GEO_REGIONS.map((geo, idx) => (
                    <MenuItem value={geo} key={idx}>
                      <Checkbox checked={geographies.includes(geo)} />
                      {geo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <FormControl sx={{ m: 1, minWidth: 120, height: 20, marginTop: 0 }} size="small">
                <InputLabel sx={{ m: 0, margin: 0, height: 1, border: 0, padding: 0, fontSize: 14 }}>Semester</InputLabel>
                <Select
                  multiple
                  autoWidth
                  value={semesters}
                  label="Semester"
                  onChange={selectSemester}
                  renderValue={(selected) => selected.join(', ')}
                  sx={{ padding: 0, border: 0 }}
                >
                  {['Winter', 'Spring', 'Summer', 'Fall'].map((sem, idx) => (
                    <MenuItem value={sem} key={idx}>
                      <Checkbox checked={semesters.includes(sem)} />
                      {sem}
                    </MenuItem>
                  ))}
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
                style={{ minWidth: 120, marginLeft: 8 }}
              />
            </div>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', paddingLeft: 3, width: 1, gap: 0, border: '0px solid', flexGrow: 1, gridTemplateColumns: 'repeat(10, 1fr)' }}>
          <Box sx={{ display: 'flex', height: 50, }}>
            <FormControl sx={{ m: 0 }} component="fieldset" variant="standard">
              <FormGroup row={true}>
                <FormControlLabel
                  control={
                    <Checkbox checked={is_WRIT} onChange={selectFilters} name="is_WRIT" />
                  }
                  label="WRIT"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={is_RPP} onChange={selectFilters} name="is_RPP" />
                  }
                  label="Race, Power, & Privilege (RPP)"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={is_remote_only} onChange={selectFilters} name="is_remote_only" />
                  }
                  label="Remote Only"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={is_remote_accessible} onChange={selectFilters} name="is_remote_accessible" />
                  }
                  label="Remote Accessible"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={is_premodern} onChange={selectFilters} name="is_premodern" />
                  }
                  label="Premodern"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={is_CBLR} onChange={selectFilters} name="is_CBLR" />
                  }
                  label="Community-Based Learning & Research (CBLR)"
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
        <CourseCard key={index} course={course} status={false} canEdit={user?.role === 'manager'} canAccept={false} canNewProposal={user?.role !== "default"} isRestrictedView={true} />
      ))
      }
    </div>
  );
};