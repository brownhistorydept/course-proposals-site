import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { submitCourse } from './utils/courses';
import { editCourse } from './utils/courses';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { fetchUsers } from "./utils/users";
import InputLabel from '@mui/material/InputLabel';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router'
import { ICourse } from "../../server/src/models/Course";
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { GEO_REGIONS, TIMES, TIME_STRINGS } from './utils/constants';

function CourseProposal() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
  const [alertTitle, setAlertTitle] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertPath, setAlertPath] = useState<string | undefined>();

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();

  }, []);

  const [allProfessors, setAllProfessors] = useState<IUser[]>();
  // called once when components on page have rendered
  useEffect(() => {
    async function getProfessors() {
      await fetchUsers(setAllProfessors, true);
    }
    getProfessors();
  }, []);

  function sortProfessors() {
    allProfessors?.sort((prof1, prof2) => {
      const prof1_surname = prof1.displayName.split(' ')[1]
      const prof2_surname = prof2.displayName.split(' ')[1]
      return prof1_surname.localeCompare(prof2_surname)
    }
    )
  }

  interface CustomizedState {
    course: any,
    isEditing: boolean,
    isNewProposal: boolean
  }

  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  // window.history.replaceState(null, "")
  const myState = state;

  var originalCourse = {} as ICourse;
  var isEditing = false;
  var isNewProposal = false;
  if (myState !== null) {
    originalCourse = myState.course;
    isEditing = myState.isEditing;
    isNewProposal = myState.isNewProposal;
  }

  const [isRegular, setRegular] = useState(1);
  const [leaveSpring, setleaveSpring] = useState(false);
  const [leaveFall, setleaveFall] = useState(false);
  const [notes, setNotes] = useState('');
  const [syllabusLink, setSyllabusLink] = useState('');

  const [courseNumber, setCourseNumber] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [professors, setProfessors] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [isUndergrad, setIsUndergrad] = useState(true);
  const [geography, setGeography] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [courseType, setCourseType] = useState('0150 Lecture Course');
  const [writ, setWrit] = useState(false);
  const [rpp, setRPP] = useState(false);
  const [cblr, setCBLR] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [remoteAccessible, setRemoteAccessible] = useState(false);
  const [premodern, setPremodern] = useState(false);
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(new Date().getFullYear());
  const [time1, setTime1] = useState('A');
  const [time2, setTime2] = useState('B');
  const [time3, setTime3] = useState('C');
  const [finalTime, setFinalTime] = useState('');

  useEffect(() => {
    // if creating a new proposal, prefill values w/ original course values
    if (myState != null) {
      if (typeof originalCourse.on_leave_fall != "undefined") {
        setleaveFall(originalCourse.on_leave_fall)
      }

      if (typeof originalCourse.on_leave_spring != "undefined") {
        setleaveSpring(originalCourse.on_leave_spring)
      }

      if (typeof originalCourse.is_regular_prof != "undefined") {
        setRegular(originalCourse.is_regular_prof ? 1 : 0)
      }

      if (typeof originalCourse.course_title !== "undefined") {
        setCourseTitle(originalCourse.course_title)
      }

      if (typeof originalCourse.description !== "undefined") {
        setDescription(originalCourse.description)
      }

      if (typeof originalCourse.professors !== "undefined") {
        setProfessors(originalCourse.professors)
      }

      if (typeof originalCourse.syllabus_link != "undefined") {
        setSyllabusLink(originalCourse.syllabus_link)
      }

      if (typeof originalCourse.levels != "undefined") {
        setLevels(originalCourse.levels)
      }

      if (typeof originalCourse.is_undergrad !== "undefined") {
        setIsUndergrad(originalCourse.is_undergrad)
      }

      if (typeof originalCourse.is_RPP != "undefined") {
        setRPP(originalCourse.is_RPP)
      }

      if (typeof originalCourse.is_WRIT != "undefined") {
        setWrit(originalCourse.is_WRIT)
      }

      if (typeof originalCourse.is_CBLR != "undefined") {
        setCBLR(originalCourse.is_CBLR)
      }

      if (typeof originalCourse.is_premodern != "undefined") {
        setPremodern(originalCourse.is_premodern)
      }

      if (typeof originalCourse.is_remote_accessible != "undefined") {
        setRemoteAccessible(originalCourse.is_remote_accessible)
      }
      if (typeof originalCourse.is_remote_only != "undefined") {
        setRemoteOnly(originalCourse.is_remote_only)
      }

      if (typeof originalCourse.semester !== "undefined") {
        setSemester(originalCourse.semester)
      }
      if (typeof originalCourse.year !== "undefined") {
        setYear(originalCourse.year)
      }
      if (typeof originalCourse.time_ranking !== "undefined") {
        setTime1(originalCourse.time_ranking[0])
        setTime2(originalCourse.time_ranking[1])
        setTime3(originalCourse.time_ranking[2])
      }
      if (typeof originalCourse.geography !== "undefined") {
        setGeography(originalCourse.geography)
      }

      if (typeof originalCourse.course_type !== 'undefined') {
        setCourseType(originalCourse.course_type)
      }

      if (typeof originalCourse.final_time != "undefined") {
        setFinalTime(originalCourse.final_time)
      }

      if (typeof originalCourse.course_number != "undefined") {
        setCourseNumber(originalCourse.course_number)
      }

      if (typeof originalCourse.further_notes != "undefined") {
        setNotes(originalCourse.further_notes)
      }
    }

  }, []);

  if (user?.role === "default") {
    navigate('/course_catalog');
  }

  const openAlert = (title: string, path?: string) => {
    setAlertTitle(title);
    setAlertOpen(true);
    setAlertPath(path);
  }

  async function hasError() {
    if (courseTitle === "" || description === "" || semester === "" || year === 0 || professors.length === 0 || levels.length === 0) {
      openAlert("Please fill in all required fields")
      return true;
    } else if (isNaN(year)) {
      openAlert("Year has to be a numerical value")
      return true;
    } else if (time1 === time2 || time2 === time3 || time1 === time3) {
      openAlert("Please enter three different times for Time Ranking")
      return true;
    } else if (isUndergrad && geography.length === 0) {
      openAlert("Please select geography")
      return true;
    }

    return false;
  }

  async function edit() {
    const error = await hasError()
    if (error) {
      return;
    }

    let profMap = new Map<string, string>();
    allProfessors?.forEach((prof) => {
      profMap.set(prof.displayName!, prof._id!)
    })
    var profId: string[] = []
    professors.forEach((prof) => {
      profId.push(profMap.get(prof)!)
    })
    var proposedCourse = {
      on_leave_fall: leaveFall,
      on_leave_spring: leaveSpring,
      is_regular_prof: isRegular === 1,
      course_title: courseTitle,
      description: description,
      professors: profId,
      syllabus_link: syllabusLink,
      levels: levels,
      is_undergrad: isUndergrad,
      is_RPP: rpp,
      is_WRIT: writ,
      is_CBLR: cblr,
      is_premodern: premodern,
      course_type: courseType,
      is_remote_accessible: remoteAccessible,
      is_remote_only: remoteOnly,
      semester: semester,
      year: year,
      time_ranking: [time1, time2, time3],
      geography: geography,
      course_number: courseNumber,
      proposal_status: originalCourse!.proposal_status!,
      further_notes: notes,
      final_time: finalTime,
      _id: originalCourse!._id!
    }
    const success = await editCourse(proposedCourse);
    if (success) {
      if (user?.role === "manager") {
        if (originalCourse?.proposal_status === 'accepted by CCC') {
          openAlert("Course successfully edited", '/course_catalog');
        } else {
          openAlert("Course successfully edited", '/review_courses');
        }
      } else {
        openAlert("Course successfully edited", '/my_courses')
      }
    } else {
      openAlert("Error editing course")
      return;
    }
  }

  async function submit() {

    const error = await hasError()
    if (error) {
      return;
    }

    let profMap = new Map<string, string>();
    allProfessors?.forEach((prof) => {
      profMap.set(prof.displayName!, prof._id!)
    })
    var profId: string[] = []
    professors.forEach((prof) => {
      profId.push(profMap.get(prof)!)
    })

    var proposedCourse = {
      on_leave_fall: leaveFall,
      on_leave_spring: leaveSpring,
      is_regular_prof: isRegular === 1,
      course_title: courseTitle,
      description: description,
      professors: profId,
      syllabus_link: syllabusLink,
      levels: levels,
      is_undergrad: isUndergrad,
      is_RPP: rpp,
      is_WRIT: writ,
      is_CBLR: cblr,
      is_premodern: premodern,
      course_type: courseType,
      is_remote_accessible: remoteAccessible,
      is_remote_only: remoteOnly,
      semester: semester,
      year: year,
      time_ranking: [time1, time2, time3],
      geography: geography,
      final_time: finalTime,
      course_number: courseNumber,
      further_notes: notes,
    }
    var success = false;
    if (isNewProposal) {
      success = await submitCourse({ original: originalCourse!, proposed: proposedCourse });
    } else {
      success = await submitCourse({ proposed: proposedCourse });
    }

    if (success) {
      if (user?.role === "manager") {
        openAlert("Course successfully submitted", '/review_courses')
      } else {
        openAlert("Course successfully submitted", '/my_courses')
      }
    } else {
      openAlert("Error submitting course")
      return;
    }
  }

  return (
    <div className="CourseProposal">

      <NavBar user={user} />
      <Box sx={{
        margin: 'auto', marginTop: 4, maxWidth: 1060, paddingLeft: 0, border: 0
      }}>
        <br />
        <Box
          sx={{
            width: 500,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}>
          <Typography variant="h3" paddingBottom={5}>
            Course Proposal
            <Typography variant="body2" my={"8px"} mx="auto">Hover over field labels to see descriptions. Fields marked with * are required.</Typography>
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} maxWidth={1000} mx="auto">

        {user?.role === "manager" &&
          <Grid item xs={11} container spacing={2}>
            <Grid item xs={2.2}>
              <Tooltip title="Full course number, including department abbreviation (e.g. HIST0150A), entered by the manager" placement="bottom-end" arrow>
                <Typography variant="body1" fontWeight="bold" align='right'>Course Number</Typography>
              </Tooltip>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size='small'
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
              />
            </Grid>
          </Grid>}

        {user?.role === "manager" &&
          <Grid item xs={11} container spacing={2}>
            <Grid item xs={2.2}>
              <Tooltip title="Time slot for the course, entered by the manager" placement="bottom-end" arrow>
                <Typography variant="body1" fontWeight="bold" align='right'>Final Time</Typography>
              </Tooltip>
            </Grid>

            <Grid marginLeft={1.8} marginTop={2}>
              <FormControl>
                <InputLabel>Final Time</InputLabel>
                <Select
                  label="Final Time"
                  size='small'
                  fullWidth
                  value={finalTime}
                  onChange={(e) => { setFinalTime(e.target.value) }}
                >
                  {TIMES.map((time, index) =>
                    <MenuItem key={index} value={time}>{TIME_STRINGS[index]}</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={2.75}>
              <Typography variant="body2">If final time is not listed in the dropdown, write it here:</Typography>
            </Grid>

            <Grid marginTop={2}>
              <TextField
                size='small'
                onChange={(e) => setFinalTime(e.target.value)}
              />
            </Grid>
          </Grid>}

        <Grid item xs={2}>
          <Tooltip title="Are you a regular tenure-track/tenured HIST faculty member, or not?" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Regular Professor? *</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={9.5}>
          <Select
            size='small'
            autoWidth
            value={isRegular}
            onChange={(e) => {
              let val = e.target.value as number
              setRegular(val)
            }
            }
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in fall? *</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <FormControlLabel control={<Checkbox checked={leaveFall} onClick={(e) => { setleaveFall((e.target as HTMLInputElement).checked) }} />} label="" />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in spring? *</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <FormControlLabel control={<Checkbox checked={leaveSpring} onClick={(e) => { setleaveSpring((e.target as HTMLInputElement).checked) }} />} label="" />
        </Grid>

        <Grid item xs={2}>
          <Tooltip title="Title of the course (e.g. War, Tyranny, and Peace in Modern Europe)" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title *</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          {myState === null && <TextField
            size='small'
            fullWidth
            required
            onChange={(e) => setCourseTitle(e.target.value)}
          />}
          {myState !== null && <TextField
            size='small'
            fullWidth
            required
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
          />}
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Professor(s) *</Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <Select
              size='small'
              multiple
              value={professors}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setProfessors(
                  typeof value === 'string' ? value.split(',') : value,
                );
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {sortProfessors()}
              {allProfessors?.map((prof, index) => (
                <MenuItem key={index} value={prof.displayName}>
                  <Checkbox checked={professors.indexOf(prof.displayName) > -1} />
                  <ListItemText primary={`${prof.displayName} (${prof.email})`} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Semester *</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            size='small'
            autoWidth
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value)
            }}
            sx={{ marginRight: 1 }}
          >
            <MenuItem value={"Fall"}>Fall</MenuItem>
            <MenuItem value={"Winter"}>Winter</MenuItem>
            <MenuItem value={"Spring"}>Spring</MenuItem>
            <MenuItem value={"Summer"}>Summer</MenuItem>
          </Select>
          <TextField
            size='small'
            onChange={(e) => { setYear(parseInt(e.target.value)) }}
            label="Year"
            value={year.toString() !== 'NaN' ? year.toString() : ''}
          />
        </Grid>


        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level *</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            size='small'
            multiple
            autoWidth
            value={levels}
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              const val = typeof value === 'string' ? value.split(',') : value as unknown as string[];
              setLevels(val);
              setIsUndergrad(val.includes('Undergraduate'));
            }}
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
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Type *</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            size='small'
            autoWidth
            value={courseType}
            onChange={(e) => { setCourseType(e.target.value) }}
          >
            <MenuItem value='0150 Lecture Course'>0150 Lecture Course</MenuItem>
            <MenuItem value='Gateway Intro Lecture Course'>"Gateway" Intro Lecture Course</MenuItem>
            <MenuItem value='Other (1000-level) Lecture Course'>Other (1000-level) Lecture Course</MenuItem>
            <MenuItem value='First-Year Seminar'>First-Year Seminar</MenuItem>
            <MenuItem value='Second-Year Seminar'>Second-Year Seminar</MenuItem>
            <MenuItem value='Non-Capstone Seminar'>Non-Capstone Seminar</MenuItem>
            <MenuItem value='Capstone Seminar'>Capstone Seminar</MenuItem>
            <MenuItem value='Honors Series Course'>Honors Series Course</MenuItem>
            <MenuItem value='Grad Course'>Grad Course</MenuItem>
            <MenuItem value='Grad/Undergrad Course'>Grad/Undergrad Course</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Tooltip title="The geographic region(s) that best fit the content of the course (required for undergraduate courses)" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography (undergrad *)</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <Select
              size='small'
              multiple
              value={geography}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setGeography(
                  typeof value === 'string' ? value.split(',') : value,
                );
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {GEO_REGIONS.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <Checkbox checked={geography.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>

        <Grid item xs={2}>
          <Tooltip title="Your preference ranking for course time slots, which will inform the final time choice" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time Ranking *</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={3.33}>
          <FormControl fullWidth>
            <InputLabel>1st Choice</InputLabel>
            <Select
              label="1st Choice"
              size='small'
              autoWidth
              value={time1}
              onChange={(e) => { setTime1(e.target.value) }}
            >
              {TIMES.map((time, index) =>
                <MenuItem key={index} value={time}>{TIME_STRINGS[index]}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3.33}>
          <FormControl fullWidth>
            <InputLabel>2nd Choice</InputLabel>
            <Select
              label="2nd Choice"
              size='small'
              autoWidth
              value={time2}
              onChange={(e) => { setTime2(e.target.value) }}
            >
              {TIMES.map((time, index) =>
                <MenuItem key={index} value={time}>{TIME_STRINGS[index]}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3.33}>
          <FormControl fullWidth>
            <InputLabel>3rd Choice</InputLabel>
            <Select
              label="3rd Choice"
              size='small'
              autoWidth
              value={time3}
              onChange={(e) => { setTime3(e.target.value) }}
            >
              {TIMES.map((time, index) =>
                <MenuItem key={index} value={time}>{TIME_STRINGS[index]}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Tooltip title="A short paragraph describing the course content, which will end up on CAB" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description *</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            value={description}
            multiline={true}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Grid>

        <Grid item xs={4.5}></Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={writ} onClick={(e) => { setWrit((e.target as HTMLInputElement).checked) }} />} label="WRIT" />
            <FormControlLabel control={<Checkbox checked={rpp} onClick={(e) => { setRPP((e.target as HTMLInputElement).checked) }} />} label="RPP" />
            <FormControlLabel control={<Checkbox checked={remoteOnly} onClick={(e) => { setRemoteOnly((e.target as HTMLInputElement).checked) }} />} label="Remote Only" />
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={remoteAccessible} onClick={(e) => { setRemoteAccessible((e.target as HTMLInputElement).checked) }} />} label="Remote Accessible" />
            <FormControlLabel control={<Checkbox checked={premodern} onClick={(e) => { setPremodern((e.target as HTMLInputElement).checked) }} />} label="Premodern" />
            <FormControlLabel control={<Checkbox checked={cblr} onClick={(e) => { setCBLR((e.target as HTMLInputElement).checked) }} />} label="CBLR" />
          </FormGroup>
        </Grid>
        <Grid item xs={1.5}></Grid>

        <Grid item xs={2}>
          <Tooltip title="Any extra notes by professor or director/manager that don't fit into the other fields" placement="bottom-end" arrow>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Further Notes</Typography>
          </Tooltip>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            value={notes}
            multiline={true}
            rows={3}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Syllabus Link</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            value={syllabusLink}
            onChange={(e) => setSyllabusLink(e.target.value)}
          />
          <Typography variant="body2" mx="auto">If you are regular professor teaching this course for the first time, please add a syllabus link.</Typography>
        </Grid>

        <Grid item xs={6}></Grid>
        <Grid marginY={2}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
            onClick={() => {
              if (isEditing) {
                edit()
              } else {
                submit()
              }
            }}>
            <Typography gutterBottom variant="body1">
              Submit
            </Typography>
          </Button>
        </Grid>
      </Grid>

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

export default CourseProposal;
