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
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router'
import { ICourse } from "../../server/src/models/Course";
import { Dialog, DialogActions, DialogTitle } from '@mui/material';

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

  interface CustomizedState {
    course: any,
    isEditing: boolean,
    isNewProposal: boolean
  }

  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  window.history.replaceState(null, "")
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
  const [isUndergrad, setIsUndergrad] = useState(1);
  const [geography, setGeography] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [capstone, setCapstone] = useState(false);
  const [fys, setFys] = useState(false);
  const [sys, setSys] = useState(false);
  const [intro, setIntro] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [writ, setWrit] = useState(false);
  const [rpp, setRPP] = useState(false);
  const [cblr, setCBLR] = useState(false);
  const [remote, setRemote] = useState(false);
  const [premodern, setPremodern] = useState(false);
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(new Date().getFullYear());
  const [time1, setTime1] = useState('A');
  const [time2, setTime2] = useState('B');
  const [time3, setTime3] = useState('C');
  const [finalTime, setFinalTime] = useState('A');

  useEffect(() => {
    if (myState != null) {
      setCourseTitle(originalCourse.course_title)
      setProfessors(originalCourse.professors);

      setIsUndergrad(originalCourse.is_undergrad ? 1 : 0)
      if (typeof originalCourse.geography !== "undefined") {
        setGeography(originalCourse.geography)
      }

      setDescription(originalCourse.description)
      if (typeof originalCourse.is_capstone != "undefined") {
        setCapstone(originalCourse.is_capstone)
      }
      if (typeof originalCourse.is_FYS != "undefined") {
        setSys(originalCourse.is_FYS)
      }
      if (typeof originalCourse.is_SYS != "undefined") {
        setSys(originalCourse.is_SYS)
      }
      if (typeof originalCourse.is_intro != "undefined") {
        setIntro(originalCourse.is_intro)
      }
      if (typeof originalCourse.is_lecture != "undefined") {
        setLecture(originalCourse.is_lecture)
      }
      if (typeof originalCourse.is_WRIT != "undefined") {
        setWrit(originalCourse.is_WRIT)
      }
      if (typeof originalCourse.is_RPP != "undefined") {
        setRPP(originalCourse.is_RPP)
      }
      if (typeof originalCourse.is_remote != "undefined") {
        setRemote(originalCourse.is_remote)
      }
      if (typeof originalCourse.is_Premodern != "undefined") {
        setPremodern(originalCourse.is_Premodern)
      }
      if (typeof originalCourse.is_CBLR != "undefined") {
        setCBLR(originalCourse.is_CBLR)
      }

      setSemester(originalCourse.semester)
      setYear(originalCourse.year)
      setTime1(originalCourse.time_ranking[0])
      setTime2(originalCourse.time_ranking[1])
      setTime3(originalCourse.time_ranking[2])

      if (typeof originalCourse.final_time != "undefined") {
        setFinalTime(originalCourse.final_time)
      }

      if (typeof originalCourse.course_number != "undefined") {
        setCourseNumber(originalCourse.course_number.split(" ")[1])
      }

      if (typeof originalCourse.is_regular_prof != "undefined") {
        originalCourse.is_regular_prof ? setRegular(1) : setRegular(0)
      }

      if (typeof originalCourse.on_leave_fall != "undefined") {
        setleaveFall(originalCourse.on_leave_fall)
      }

      if (typeof originalCourse.on_leave_spring != "undefined") {
        setleaveSpring(originalCourse.on_leave_spring)
      }

      if (typeof originalCourse.syllabus_link != "undefined") {
        setSyllabusLink(originalCourse.syllabus_link)
      }

      if (typeof originalCourse.further_notes != "undefined") {
        setNotes(originalCourse.further_notes)
      }
    }

  }, []);

  const geographyValues = [
    'Africa', "East Asia", "Europe", "Latin America", "Middle East - South Asia (MESA)", "North America", "Global"
  ]
  const timeValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T"]
  const timeStrings = ["A: MWF 8-8:50", "B: MWF 9-9:50", "C: MWF 10-10:50", "D: MWF 11-11:50",
    "E: MWF 12-12:50", "F: MWF 1-1:50", "G: MWF 2-2:50", "H: TTh 9-10:20",
    "I: TTh 10:30-11:50", "J: TTh 1-2:20", "K: TTh 2:30-3:50",
    "L: TTh 6:40-8", "M: M 3-5:30", "N: W 3-5:30", "O: F 3-5:30",
    "P: T 4-6:30", "Q: Th 4-6:30", "T: MW 3-4:20"]

    if (user?.role === "default") {
      navigate('/course_catalog');
    }

    const openAlert = (title: string, path?: string)  => {
      setAlertTitle(title);
      setAlertOpen(true);
      setAlertPath(path);
    }

    async function hasError() {
      if (courseTitle === "" || description === "" || semester === "" || year === 0 || professors.length === 0) {
        openAlert("Please fill in all required fields")
        return true;
      } else if (isNaN(year)) {
        openAlert("Year has to be a numerical value")
        return true;
      } else if (time1 === time2 || time2 === time3 || time1 === time3) {
        openAlert("Please enter three different times for Time Ranking")
        return true;
      } else if (isUndergrad === 1 && geography.length === 0) {
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
    if (isUndergrad === 1) {
      var proposedUndergradCourse = {
        on_leave_fall: leaveFall,
        on_leave_spring: leaveSpring,
        is_regular_prof: isRegular === 1,
        course_title: courseTitle,
        description: description,
        professors: profId,
        syllabus_link: syllabusLink,
        is_undergrad: true,
        is_RPP: rpp,
        is_WRIT: writ,
        is_Premodern: premodern,
        is_FYS: fys,
        is_SYS: sys,
        is_capstone: capstone,
        is_lecture: lecture,
        is_intro: intro,
        is_remote: remote,
        semester: semester,
        year: year,
        time_ranking: [time1, time2, time3],
        geography: geography,
        course_number: `HIST ${courseNumber}`,
        further_notes: notes,
        proposal_status: originalCourse!.proposal_status!,
        _id: originalCourse!._id!
      }
      const success = await editCourse(proposedUndergradCourse);
      if (success) {
        if (user?.role === "manager") {
          openAlert("Course successfully edited", '/review_courses');
        } else {
          openAlert("Course successfully edited", '/my_courses')
        } 
      } else {
        openAlert("Error editing course")
        return;
      }
    } else {
      var proposedGradCourse = {
        on_leave_fall: leaveFall,
        on_leave_spring: leaveSpring,
        is_regular_prof: isRegular === 1,
        course_title: courseTitle,
        description: description,
        professors: profId,
        syllabus_link: syllabusLink,
        is_undergrad: false,
        semester: semester,
        year: year,
        time_ranking: [time1, time2, time3],
        course_number: `HIST ${courseNumber}`,
        further_notes: notes,
        proposal_status: originalCourse!.proposal_status!,
        _id: originalCourse!._id!
      }
      const success = await editCourse(proposedGradCourse);
      if (success) {
        if (user?.role === "manager") {
          openAlert("Course successfully submitted", '/review_courses')
        } else {
          openAlert("Course successfully submitted", '/my_courses')
        }
      } else {
        openAlert("Error editing course")
        return;
      }
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
    
    if (isUndergrad === 1) {
      var proposedUndergradCourse = {
        on_leave_fall: leaveFall,
        on_leave_spring: leaveSpring,
        is_regular_prof: isRegular === 1,
        course_title: courseTitle,
        description: description,
        professors: profId,
        syllabus_link: syllabusLink,
        is_undergrad: true,
        is_RPP: rpp,
        is_WRIT: writ,
        is_Premodern: premodern,
        is_FYS: fys,
        is_SYS: sys,
        is_capstone: capstone,
        is_lecture: lecture,
        is_intro: intro,
        is_remote: remote,
        semester: semester,
        year: year,
        time_ranking: [time1, time2, time3],
        geography: geography,
        course_number: `HIST ${courseNumber}`,
        further_notes: notes,
      }
      var success = false;
      if (isNewProposal) {
        success = await submitCourse({original: originalCourse!, proposed: proposedUndergradCourse});
      } else {
        success = await submitCourse({proposed: proposedUndergradCourse});
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
    } else {
      var proposedGradCourse = {
        on_leave_fall: leaveFall,
        on_leave_spring: leaveSpring,
        is_regular_prof: isRegular === 1,
        course_title: courseTitle,
        description: description,
        professors: profId,
        syllabus_link: syllabusLink,
        is_undergrad: false,
        semester: semester,
        year: year,
        time_ranking: [time1, time2, time3],
        course_number: `HIST ${courseNumber}`,
        further_notes: notes,
      }
      success = false;
      if (isNewProposal) {
        success = await submitCourse({original: originalCourse!, proposed: proposedGradCourse});
      } else {
        success = await submitCourse({proposed: proposedGradCourse});
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
          </Typography>

        </Box>
      </Box>

      <Grid container spacing={2} maxWidth={1000} mx="auto">

        {user?.role === "manager" &&
          <Grid item xs={11} container spacing={2}>
            <Grid item xs={2.2}>
              <Typography variant="body1" fontWeight="bold" align='right'>Course Number</Typography>
            </Grid>

            <Grid item xs={.6}>
              <Typography variant="body1" width="2">HIST</Typography>
            </Grid>
            <Grid item xs={2}>
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
              <Typography variant="body1" fontWeight="bold" align='right'>Final Time</Typography>
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
                  {timeValues.map((time, index) =>
                    <MenuItem value={time}>{timeStrings[index]}</MenuItem>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Regular Professor? *</Typography>
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
            <MenuItem value={1}>Regular</MenuItem>
            <MenuItem value={0}>Non Regular</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in fall?</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <FormControlLabel control={<Checkbox checked={leaveFall} onClick={(e) => { setleaveFall((e.target as HTMLInputElement).checked) }} />} label="" />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in spring?</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <FormControlLabel control={<Checkbox checked={leaveSpring} onClick={(e) => { setleaveSpring((e.target as HTMLInputElement).checked) }} />} label="" />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title *</Typography>
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
              {allProfessors?.map((prof) => (
                <MenuItem key={prof.displayName} value={prof.displayName}>
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
            value={year.toString()}
          />
        </Grid>


        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level *</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            size='small'
            autoWidth
            value={isUndergrad}
            onChange={(e) => {
              let val = e.target.value as number
              setIsUndergrad(val)
            }
            }
          >
            <MenuItem value={1}>Undergraduate</MenuItem>
            <MenuItem value={0}>Graduate</MenuItem>
          </Select>
        </Grid>

        {isUndergrad === 1 && <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography *</Typography>
        </Grid>}
        {isUndergrad === 1 && <Grid item xs={10}>
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
              {geographyValues.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={geography.indexOf(name) > -1} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

        </Grid>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time Ranking *</Typography>
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
              {timeValues.map((time, index) =>
                <MenuItem value={time}>{timeStrings[index]}</MenuItem>
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
              {timeValues.map((time, index) =>
                <MenuItem value={time}>{timeStrings[index]}</MenuItem>
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
              {timeValues.map((time, index) =>
                <MenuItem value={time}>{timeStrings[index]}</MenuItem>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description* </Typography>
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


        {isUndergrad === 1 && <Grid item xs={4.5}></Grid>}
        {isUndergrad === 1 && <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={capstone} onClick={(e) => { setCapstone((e.target as HTMLInputElement).checked) }} />} label="Capstone" />
            <FormControlLabel control={<Checkbox checked={fys} onClick={(e) => { setFys((e.target as HTMLInputElement).checked) }} />} label="First-Year Seminar" />
            <FormControlLabel control={<Checkbox checked={sys} onClick={(e) => { setSys((e.target as HTMLInputElement).checked) }} />} label="Second-Year Seminar" />
            <FormControlLabel control={<Checkbox checked={intro} onClick={(e) => { setIntro((e.target as HTMLInputElement).checked) }} />} label="Intro" />
            <FormControlLabel control={<Checkbox checked={lecture} onClick={(e) => { setLecture((e.target as HTMLInputElement).checked) }} />} label="Lecture" />
          </FormGroup>
        </Grid>}

        {isUndergrad === 1 && <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={writ} onClick={(e) => { setWrit((e.target as HTMLInputElement).checked) }} />} label="WRIT" />
            <FormControlLabel control={<Checkbox checked={rpp} onClick={(e) => { setRPP((e.target as HTMLInputElement).checked) }} />} label="RPP" />
            <FormControlLabel control={<Checkbox checked={remote} onClick={(e) => { setRemote((e.target as HTMLInputElement).checked) }} />} label="Accessible to Remote Students (REM)" />
            <FormControlLabel control={<Checkbox checked={premodern} onClick={(e) => { setPremodern((e.target as HTMLInputElement).checked) }} />} label="Premodern" />
            <FormControlLabel control={<Checkbox checked={cblr} onClick={(e) => { setCBLR((e.target as HTMLInputElement).checked) }} />} label="CBLR" />
          </FormGroup>
        </Grid>}
        {isUndergrad === 1 && <Grid item xs={1.5}></Grid>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Further Notes </Typography>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'> Syllabus Link </Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            value={syllabusLink}
            onChange={(e) => setSyllabusLink(e.target.value)}
          />
          <Typography variant="body2" mx="auto"> If you are regular faculty teaching this course for the first time, please add a syllabus link. </Typography>
          <Typography variant="body2" my={"8px"} mx="auto">* are required fields </Typography>
        </Grid>

        <Grid item xs={6}></Grid>
        <Grid marginBottom={2}>
          <Button
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
            onClick={() => {
              console.log(courseTitle)
              console.log(description)
              console.log(year)
              console.log(professors.length)

              if (isEditing) {
                edit()
              } else {
                submit()
              }}}>
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
