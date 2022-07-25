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
  const [yearSems, setYearSems] = useState<string[]>([]);
  const [yearSemOptions, setYearSemOptions] = useState<string[]>([]);

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  useEffect(() => {
    let isMounted = true;
    var params = {};
    if (typeof user === "undefined") {
      return;
    }
    async function getCourses() {
      params = { professors: user?._id };
      await fetchCourses(setAcceptedCourses, params, true, isMounted);
      await fetchCourses(setSubmittedCourses, params, false, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  useEffect(() => {
    if (typeof user === "undefined" || (typeof acceptedCourses === 'undefined' && typeof submittedCourses === undefined)) {
      return;
    }
    getYearSems();
  }, [acceptedCourses, submittedCourses])

  function getYearSems() {
    const allCourses = (acceptedCourses ?? []).concat((submittedCourses ?? []));
    const sortedCourses = allCourses.sort((c1, c2) => {
      const semesters = ['Fall', 'Summer', 'Spring', 'Winter'];
      if (c1.year > c2.year) {
        return -1;
      } else if (c1.year < c2.year) {
        return 1;
      } else {
        return semesters.indexOf(c1.semester) - semesters.indexOf(c2.semester);
      }
    });

    const options = [...new Set(sortedCourses.map(course => `${course.semester} ${course.year}`))]
    // set of every year/semester this user has a course entry; used to populate dropdown options
    setYearSemOptions(options);
    setYearSems([options[0]])
  }

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

          <Grid item xs={8} marginBottom='10px'>
            <FormControl fullWidth>
              <Select
                size='small'
                multiple
                value={yearSems}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setYearSems(
                    typeof value === 'string' ? value.split(',') : value,
                  );
                }}
                renderValue={(selected) => selected.join(', ')}
              >
                {yearSemOptions.map((pair) => (
                  <MenuItem key={pair} value={pair}>
                    <Checkbox checked={yearSems.indexOf(pair) > -1} />
                    <ListItemText primary={pair} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Box>

        <Box sx={{ paddingLeft: 2, }}>
          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
            Accepted by CCC
          </Typography>

          {acceptedCourses?.map((course, index) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard key={index} course={course} status={false} canEdit={false} canAccept={false} canNewProposal={false} /> : <></>
          ))}

          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
            Submitted
          </Typography>

          {submittedCourses?.map((course, index) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard key={index} course={course} status={true} canEdit={true} canAccept={false} canNewProposal={false} /> : <></>
          ))}
        </Box>
      </Box>

    </div>
  );
}

export default MyCourses;
