import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from './components/CourseCard';
import { Checkbox, FormControl, Grid, ListItemText, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function MyCourses() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [acceptedCourses, setAcceptedCourses] = useState<ICourse[]>();
  const [submittedCourses, setSubmittedCourses] = useState<ICourse[]>();
  const [years, setYears] = useState<string[]>([new Date().getFullYear().toString()]);
  const [semesters, setSemesters] = useState<string[]>([]);

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  useEffect(() => {
    var params = {};
    if (typeof user === "undefined") {
      return;
    }
    async function getCourses() {
      params = { professors: user?._id };
      await fetchCourses(setAcceptedCourses, params, true);
      await fetchCourses(setSubmittedCourses, params, false);

    }
    getCourses();
  }, [user]);

  // set of every year/semester this user has a course entry; used to populate dropdown options
  var allYears = [...new Set((acceptedCourses? acceptedCourses.map(course => course.year.toString()) : []).concat(submittedCourses? submittedCourses.map(course => course.year.toString()) : []))];
  var allSemesters = [...new Set((acceptedCourses? acceptedCourses.map(course => course.semester) : []).concat(submittedCourses? submittedCourses.map(course => course.semester) : []))];

  // FIXME
  // useEffect(() => {
  //   const semesterObj =
  //     {
  //       0: 'Winter', // Jan
  //       1: 'Spring', // Feb
  //       2: 'Spring', // Mar
  //       3: 'Spring', // Apr
  //       4: 'Spring', // May
  //       5: 'Summer', // Jun
  //       6: 'Summer', // Jul
  //       7: 'Summer', // Aug
  //       8: 'Fall', // Sep
  //       9: 'Fall', // Oct
  //       10: 'Fall', // Nov
  //       11: 'Winter' // Dec
  //     }

  //     const semesterMap = new Map(Object.entries(semesterObj));
  //     var currentSemester = semesterMap.get(new Date().getMonth().toString());

  //     if (!allSemesters?.includes(currentSemester!)) { // if current semester isn't in courses, just set default to first semester listed
  //       currentSemester = allSemesters[0]
  //     }
  //     // console.log('semesters');
  //     // console.log(semesters);
  //     console.log(semesters)
  //     console.log(currentSemester)

  //   async function getSemester() {
  //     setSemesters([currentSemester!])
  //   }
  // getSemester();
  // });

  if (user?.role === "default" || user?.role === "manager") {
    navigate('/course_catalog');
  }
  return (
    <div className="MyCourses">

      <NavBar user={user} />
      <Box sx={{
        margin: 'auto', marginTop: 4, maxWidth: 1060, paddingLeft: 0, border: 0
      }}>
        <br />
        <Box sx={{ width: 500, margin: 0, paddingLeft: 2, }}>
          <Typography variant="h2" paddingBottom={5}>
            My Courses
          </Typography>

          <Grid item xs={3} marginBottom='10px'>
            <FormControl fullWidth>
              <Select
                size='small'
                multiple
                value={years}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setYears(
                    typeof value === 'string' ? value.split(',') : value,
                  );
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {allYears?.map((year) => (
                  <MenuItem key={year} value={year}>
                    <Checkbox checked={years.indexOf(year) > -1} />
                    <ListItemText primary={year} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={3} marginBottom='20px'>
            <FormControl fullWidth>
              <Select
                size='small'
                multiple
                value={semesters}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setSemesters(
                    typeof value === 'string' ? value.split(',') : value,
                  );
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {allSemesters?.map((semester) => (
                  <MenuItem key={semester} value={semester}>
                    <Checkbox checked={semesters.indexOf(semester) > -1} />
                    <ListItemText primary={semester} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
            Accepted by CCC
          </Typography>
          {typeof (acceptedCourses) == "undefined" && <Typography variant="body1"> No courses found </Typography>}
        </Box>
        
        {/* work in progress */}
        {/* {acceptedCourses?
        (acceptedCourses.filter(course => years.includes(course.year.toString()) && semesters.includes(course.semester)).map(course, index) => (
          <CourseCard key={index} course={course} status={false} canEdit={false} canAccept={false} canNewProposal={false} />
        )))} */}

        {acceptedCourses?.map((course, index) => (
          <CourseCard key={index} course={course} status={false} canEdit={false} canAccept={false} canNewProposal={false} />
        ))}


        <Box sx={{ width: 500, margin: 0, paddingLeft: 2, }}>
          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3} marginTop={5}>
            Submitted
          </Typography>
          {typeof (submittedCourses) == "undefined" && <Typography variant="body1"> No courses found </Typography>}
        </Box>
        {submittedCourses?.map((course, index) => (
          <CourseCard key={index} course={course} status={true} canEdit={true} canAccept={false} canNewProposal={false} />
        ))}

      </Box>

    </div>
  );
}

export default MyCourses;
