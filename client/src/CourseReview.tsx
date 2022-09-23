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
import { Button, Checkbox, Dialog, DialogActions, DialogTitle, FormControl, Grid, ListItemText, MenuItem, Select } from '@mui/material';
import Papa from 'papaparse';
import { downloadFile } from './utils/files';

function CourseReview() {
  const [user, setUser] = useState<IUser>();
  const [underReviewCourses, setUnderReviewCourses] = useState<ICourse[]>();
  const [cccRejectedCourses, setCCCRejectedCourses] = useState<ICourse[]>();
  const [cccAcceptedCourses, setCCCAcceptedCourses] = useState<ICourse[]>();
  const [directorRejectedCourses, setDirectorRejectedCourses] = useState<ICourse[]>();
  const [directorAcceptedCourses, setDirectorAcceptedCourses] = useState<ICourse[]>();
  const [yearSems, setYearSems] = useState<string[]>([]);
  const [yearSemOptions, setYearSemOptions] = useState<string[]>([]);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertPath, setAlertPath] = useState<string | undefined>();
  const navigate = useNavigate();

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

  // get CCC rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "revisions requested by manager" };
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

  // get CCC accepted courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "accepted by CCC" };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      await fetchCourses(setCCCAcceptedCourses, params, false, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, [user]);

  // get director rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "revisions requested by director" };
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
      typeof cccRejectedCourses === 'undefined' ||
      typeof cccAcceptedCourses === 'undefined') {
      return;
    }
    getYearSems();
  }, [underReviewCourses, directorAcceptedCourses, directorRejectedCourses, cccRejectedCourses, cccAcceptedCourses]);

  function getYearSems() {
    const allCourses = (underReviewCourses ?? []).concat(
      (directorAcceptedCourses ?? []), (directorRejectedCourses ?? []), (cccRejectedCourses ?? []), (cccAcceptedCourses ?? []));
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

    let options = [...new Set(sortedCourses.map(course => `${course.semester} ${course.year}`))]
    options = options.filter(opt => opt !== 'undefined undefined');
    // set of every year/semester this user has a course entry; used to populate dropdown options
    setYearSemOptions(options);
    setYearSems([options[0]])
  }

  if (user?.role === "default" || user?.role === "professor") {
    navigate('/course_catalog');
  }

  const openAlert = (title: string, path?: string) => {
    setAlertTitle(title);
    setAlertOpen(true);
    setAlertPath(path);
  }

  const onDownload = (showAllCourses: boolean) => {
    const coursesToShow = showAllCourses ?
      (underReviewCourses ?? []).concat((directorAcceptedCourses ?? []), (directorRejectedCourses ?? []), (cccRejectedCourses ?? []), (cccAcceptedCourses ?? []))
      : (directorAcceptedCourses ?? []);

    if (!coursesToShow || coursesToShow.length === 0) {
      openAlert('No courses to download', '/review_courses')
      return;
    }

    const rows = coursesToShow.map((course) => {
      // this includes everything from Course schema (as of 9/4) except comments
      return [
        course.on_leave_fall,
        course.on_leave_spring,
        course.is_regular_prof,
        course.course_title,
        course.description,
        course.professors.map((professor) => (professor as unknown as IUser).displayName).join(', '),
        course.syllabus_link,
        course.levels,
        course.is_RPP,
        course.is_WRIT,
        course.is_CBLR,
        course.is_premodern,
        course.course_type,
        course.is_remote_accessible,
        course.is_remote_only,
        course.semester,
        course.year,
        course.time_ranking.length >= 1 ? course.time_ranking[0] : '',
        course.time_ranking.length >= 2 ? course.time_ranking[1] : '',
        course.time_ranking.length >= 3 ? course.time_ranking[2] : '',
        course.geography?.join(', '),
        course.proposal_status,
        course.course_status,
        course.course_number,
        course.final_time,
        course.further_notes,
      ];
    });

    const columns = [
      'Taking Fall Leave',
      'Taking Spring Leave',
      'Is Regular Professor?',
      'Course Title',
      'Course Description',
      'Instructor(s)',
      'Syllabus Link',
      'Course Levels',
      'RPP',
      'WRIT',
      'CBLR',
      'Premodern',
      'Course Type',
      'Remote Accessible',
      'Remote Only',
      'Semester',
      'Year',
      'Time Choice 1',
      'Time Choice 2',
      'Time Choice 3',
      'Geography',
      'Proposal Status',
      'Course Status',
      'Course Number',
      'Final Time',
      'Further Notes',
    ];
    const csvContent = Papa.unparse({ fields: columns, data: rows },);
    downloadFile(showAllCourses ? 'all-courses' : 'director-accepted-courses', csvContent, 'text/csv');
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

          {(yearSemOptions.length > 0) ?
            <Grid item xs={8} paddingBottom='30px' paddingTop='15px'>
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
            : <></>}
          <Button variant='contained' onClick={() => onDownload(false)}>Export Director Accepted Courses</Button>
          <p></p>
          <Button variant='contained' onClick={() => onDownload(true)}>Export All Courses</Button>
        </Box>
        <Typography variant="h4" color="#992525" fontWeight={500} marginY={3}>
          To Review
        </Typography>

        {underReviewCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager" || user?.role === 'curriculum coordinator'} canAccept={user?.role === "manager" || user?.role === "graduate director" || user?.role === "undergraduate director"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3} paddingTop='30px'>
          Reviewed
        </Typography>

        <Typography variant="body2" my={"12px"} mx="auto">To see Accepted by CCC courses, please see the Course Catalog.</Typography>

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Accepted by Director:
        </Typography>

        {directorAcceptedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager" || user?.role === "curriculum coordinator"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Revisions Requested by Director:
        </Typography>

        {directorRejectedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager" || user?.role === "curriculum coordinator"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}

        <Typography variant="h6" color="#992525" fontWeight={500} marginBottom={3}>
          Revisions Requested by Manager:
        </Typography>

        {cccRejectedCourses?.map((course, index) => (
          (yearSems?.some(yearSem => yearSem.indexOf(String(course.year)) > -1 && yearSem.indexOf(course.semester) > -1))
          && <CourseCard key={index} course={course} status={true} canEdit={user?.role === "manager" || user?.role === "curriculum coordinator"} canAccept={user?.role !== "curriculum coordinator"} canNewProposal={false} isRestrictedView={user?.role === 'professor' && course.proposal_status === 'accepted by CCC'} />
        ))}
      </Box>

      <Dialog open={alertOpen}>
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => {
            setAlertOpen(false);
            if (alertPath) {
              navigate(alertPath);
            }
          }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}

export default CourseReview;
