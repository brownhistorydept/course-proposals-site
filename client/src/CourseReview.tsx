import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from './components/CourseCard';
import { Navigate } from 'react-router-dom';
import { Button, Checkbox, FormControl, Grid, ListItemText, MenuItem, Select } from '@mui/material';
import Papa from 'papaparse';
import { downloadFile } from './utils/files';

function CourseReview() {
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
    let isMounted = true;
    var params = { proposal_status: "under review by director" };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setUnderReviewCourses, params, false, isMounted);
      }
    }
    getCourses();

    return () => {
      isMounted = false
    }
  }, [user]);

  // get CCC accepted courses
  useEffect(() => {
    let isMounted = true;
    var params = {}
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setCCCAcceptedCourses, params, true, isMounted);
      }
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  // get CCC rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "rejected by CCC" };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      await fetchCourses(setCCCRejectedCourses, params, false, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  // get director rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "rejected by director" };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }
    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setDirectorRejectedCourses, params, false, isMounted);
      }
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  // get director accepted courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "accepted by director" };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }
    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setDirectorAcceptedCourses, params, false, isMounted);
      }
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  useEffect(() => {
    if (typeof user === "undefined" ||
      typeof underReviewCourses === 'undefined' ||
      typeof directorAcceptedCourses == 'undefined' ||
      typeof directorRejectedCourses == 'undefined' ||
      typeof cccAcceptedCourses === 'undefined' ||
      typeof cccRejectedCourses === 'undefined') {
      return;
    }
    getYearSems();
  }, [underReviewCourses, directorAcceptedCourses, directorRejectedCourses, cccAcceptedCourses, cccRejectedCourses]);

  function getYearSems() {
    const allCourses = (underReviewCourses ?? []).concat(
      (directorAcceptedCourses ?? []), (directorRejectedCourses ?? []), (cccAcceptedCourses ?? []), (cccRejectedCourses ?? []));
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

  if (user?.role === "default" || user?.role === "professor") {
    return <Navigate to="/course_catalog" />;
  }

  const onDownload = () => {
    if (!directorAcceptedCourses || directorAcceptedCourses.length === 0) return;

    const rows = directorAcceptedCourses.map((course) => {
      return [
        course.course_number,
        course.course_title,
        course.professors.map((professor) => (professor as unknown as IUser).displayName).join(', '),
        course.description,
        course.time_ranking.length >= 1 ? course.time_ranking[0] : '',
        course.time_ranking.length >= 2 ? course.time_ranking[1] : '',
        course.time_ranking.length >= 3 ? course.time_ranking[2] : '',
        course.geography?.join(', '),
        course.is_undergrad,
        course.is_Premodern,
        course.is_RPP,
        course.is_remote_accessible,
        course.is_WRIT,
        course.is_intro,
        course.is_FYS,
        course.is_SYS,
        course.is_capstone,
        course.is_lecture,
      ];
    });

    const columns = ['Course Number', 'Course Title', 'Instructor(s)', 'Course Description', 'Time Choice 1', 'Time Choice 2', 'Time Choice 3',
      'Geography', 'Undergrad', 'Premodern', 'RPP', 'REM', 'WRIT', 'Intro (0150)', 'FYS', 'SYS', 'Capstone', 'Lecture'];
    const csvContent = Papa.unparse({ fields: columns, data: rows }, );
    downloadFile('director-accepted-courses', csvContent, 'text/csv');
  };

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

          <Button variant='contained' onClick={onDownload}>Download</Button>

          <Grid item xs={8} paddingBottom='30px'>
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
                {yearSemOptions.map((pair, index) => (
                  <MenuItem key={index} value={pair}>
                    <Checkbox checked={yearSems.indexOf(pair) > -1} />
                    <ListItemText primary={pair} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

        </Box>
        <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
          To Review
        </Typography>

        {underReviewCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role === "manager" || user?.role === "graduate director" || user?.role === "undergraduate director"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3} paddingTop='30px'>
          Reviewed
        </Typography>

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3} paddingTop='10px'>
          Accepted by CCC:

        </Typography>

        {cccAcceptedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role === "manager"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Accepted by Director:
        </Typography>

        {directorAcceptedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Rejected by Director:
        </Typography>

        {directorRejectedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Rejected by CCC:
        </Typography>

        {cccRejectedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}
      </Box>

    </div>
  );
}

export default CourseReview;
