import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from './components/CourseCard';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControl, Grid, ListItemText, MenuItem, Select } from '@mui/material';

function CourseReview() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [underReviewCourses, setUnderReviewCourses] = useState<ICourse[]>();
  const [cccAcceptedCourses, setCCCAcceptedCourses] = useState<ICourse[]>();
  const [cccRejectedCourses, setCCCRejectedCourses] = useState<ICourse[]>();
  const [directorRejectedCourses, setDirectorRejectedCourses] = useState<ICourse[]>();
  const [directorAcceptedCourses, setDirectorAcceptedCourses] = useState<ICourse[]>();
  const [yearSems, setYearSems] = useState<string[]>([]);
  const [yearSemOptions, setYearSemOptions] = useState<string[]>([]);

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  // get courses to review
  useEffect(() => {
    var params = { proposal_status: "under review by director" };
    async function getCourses() {
      if (user?.role === "undergraduate director") {
        params = Object.assign(params, { is_undergrad: true });
      } else if (user?.role === "graduate director") {
        params = Object.assign(params, { is_undergrad: false });
      }

      await fetchCourses(setUnderReviewCourses, params, false);
    }
    getCourses();
  }, [user]);

  // get CCC accepted courses
  useEffect(() => {
    async function getCourses() {
      await fetchCourses(setCCCAcceptedCourses, {}, true);
    }
    getCourses();
  }, [user]);

  // get CCC rejected courses
  useEffect(() => {
    var params = { proposal_status: "rejected by CCC" };
    async function getCourses() {
      if (user?.role === "undergraduate director") {
        params = Object.assign(params, { is_undergrad: true });
      } else if (user?.role === "graduate director") {
        params = Object.assign(params, { is_undergrad: false });
      }

      await fetchCourses(setCCCRejectedCourses, params, false);

    }
    getCourses();
  }, [user]);

  // get director rejected courses
  useEffect(() => {
    var params = { proposal_status: "rejected by director" };
    async function getCourses() {
      if (user?.role === "undergraduate director") {
        params = Object.assign(params, { is_undergrad: true });
      } else if (user?.role === "graduate director") {
        params = Object.assign(params, { is_undergrad: false });
      }

      await fetchCourses(setDirectorRejectedCourses, params, false);

    }
    getCourses();
  }, [user]);

  // get director accepted courses
  useEffect(() => {
    var params = { proposal_status: "accepted by director" };
    async function getCourses() {
      if (user?.role === "undergraduate director") {
        params = Object.assign(params, { is_undergrad: true });
      } else if (user?.role === "graduate director") {
        params = Object.assign(params, { is_undergrad: false });
      }

      await fetchCourses(setDirectorAcceptedCourses, params, false);

    }
    getCourses();
  }, [user]);

  useEffect(() => {
    if (typeof user === "undefined" || 
    (typeof underReviewCourses === 'undefined' && 
    typeof directorAcceptedCourses == 'undefined' && 
    typeof directorRejectedCourses == 'undefined'&& 
    typeof cccAcceptedCourses === 'undefined' && 
    typeof cccRejectedCourses === 'undefined')) {
      return;
    }
    getYearSems();
  }, [underReviewCourses, directorAcceptedCourses, directorRejectedCourses, cccAcceptedCourses, cccRejectedCourses]);

  function getYearSems() {
    const allCourses = (underReviewCourses ?? []).concat(
      (directorAcceptedCourses ?? []), (directorRejectedCourses ?? []), (cccAcceptedCourses ?? []), (cccRejectedCourses ?? []));
      const sortedCourses = allCourses.sort((c1, c2) => {
        const semesters = ['Fall', 'Winter', 'Spring', 'Summer'];
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

  if (user?.role === "default" || user?.role === "professor") {
    navigate('/course_catalog');
  }

  return (
    <div className="CourseReview">

      <NavBar user={user} />
      <Box sx={{
        margin: 'auto', marginTop: 4, maxWidth: 1060, paddingLeft: 0, border: 0
      }}>
        <br />
        <Box sx={{ width: 500, margin: 0, }}>
          <Typography variant="h2" paddingBottom={5}>
            Review Courses
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
        <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={7} marginTop={3}>
          To Review
        </Typography>

        {underReviewCourses?.map((course, _) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role === "manager" || user?.role === "graduate director" || user?.role === "undergraduate director"} canNewProposal={false} />: <></>
          ))}

        <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
          Reviewed
        </Typography>

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Accepted by CCC:

        </Typography>
        
        {cccAcceptedCourses?.map((course, _) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role === "manager"} canNewProposal={false} />: <></>
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Accepted by Director:
        </Typography>

        {directorAcceptedCourses?.map((course, _) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} />: <></>
          ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Rejected by Director:
        </Typography>
        
        {directorRejectedCourses?.map((course, _) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} />: <></>
          ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Rejected by CCC:
        </Typography>

        {cccRejectedCourses?.map((course, _) => (
            (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
              ? <CourseCard course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} />: <></>
          ))}
      </Box>

    </div>
  );
}

export default CourseReview;
