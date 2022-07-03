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

function MyCourses() {
  const [user, setUser] = useState<IUser>();
  const [acceptedCourses, setAcceptedCourses] = useState<ICourse[]>();
  const [submittedCourses, setSubmittedCourses] = useState<ICourse[]>();

  const [years, setYears] = useState<string[]>([new Date().getFullYear().toString()]);

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


  var allYears = [...new Set((acceptedCourses? acceptedCourses.map(course => course.year.toString()) : []).concat(submittedCourses? submittedCourses.map(course => course.year.toString()) : []))];
  console.log(allYears)

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

          <Grid item xs={3}>
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


          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
            Accepted by CCC
          </Typography>
          {typeof (acceptedCourses) == "undefined" && <Typography variant="body1"> No courses found </Typography>}
        </Box>
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
