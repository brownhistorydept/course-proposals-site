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
import { Dialog, DialogActions, DialogTitle, FormHelperText } from '@mui/material';
import { COURSE_TYPES, GEO_REGIONS, TIMES, TIME_STRINGS } from './utils/constants';

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

  function wordCounter() {
    var wordList = description.match(/[^\s]+/g)
    if (wordList !== null) {
      return wordList.length.toString()
    } else {
      return 0
    }
  }

  interface CustomizedState {
    course: any,
    isEditing: boolean,
    isNewProposal: boolean
  }

  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const myState = state;

  var originalCourse = {} as ICourse;
  var isEditing = false;
  var isNewProposal = false;
  if (myState !== null) {
    originalCourse = myState.course;
    isEditing = myState.isEditing;
    isNewProposal = myState.isNewProposal;
  }
   // when 1, time ranking is optional, else required. purely for frontend, not passed back in course schema
  const [isCrossListed, setIsCrossListed] = useState(0);
  const [isRegular, setRegular] = useState(1);
  const [leaveSpring, setleaveSpring] = useState(0);
  const [leaveFall, setleaveFall] = useState(0);
  const [notes, setNotes] = useState('');
  const [syllabusLink, setSyllabusLink] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [professors, setProfessors] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [isUndergrad, setIsUndergrad] = useState(true);
  const [geography, setGeography] = useState<string[]>([]);
  const [description, setDescription] = useState('');
  const [courseType, setCourseType] = useState('');
  const [writ, setWrit] = useState(false);
  const [rpp, setRPP] = useState(false);
  const [cblr, setCBLR] = useState(false);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [remoteAccessible, setRemoteAccessible] = useState(false);
  const [premodern, setPremodern] = useState(false);
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(new Date().getFullYear() + 1);
  const [time1, setTime1] = useState('');
  const [time2, setTime2] = useState('');
  const [time3, setTime3] = useState('');
  const [finalTime, setFinalTime] = useState('');
  const [otherFinalTime, setOtherFinalTime] = useState('');
  const [timesCantTeach, setTimesCantTeach] = useState<string[]>([]);
  const [profType, setProfType] = useState('');
  const [transcriptTitle, setTranscriptTitle] = useState('');

  useEffect(() => {
    // if creating a new proposal, prefill values w/ original course values
    if (myState != null) {
      if (typeof originalCourse.on_leave_fall != "undefined") {
        setleaveFall(originalCourse.on_leave_fall ? 1 : 0)
      }

      if (typeof originalCourse.on_leave_spring != "undefined") {
        setleaveSpring(originalCourse.on_leave_spring ? 1 : 0)
      }

      if (typeof originalCourse.is_regular_prof != "undefined") {
        setRegular(originalCourse.is_regular_prof ? 1 : 0)
      }

      if (typeof originalCourse.prof_type != "undefined") {
        setProfType(originalCourse.prof_type)
      }

      if (typeof originalCourse.course_title !== "undefined") {
        setCourseTitle(originalCourse.course_title)
      }

      if (typeof originalCourse.transcript_title !== "undefined") {
        setTranscriptTitle(originalCourse.transcript_title)
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

      if (typeof originalCourse.times_cant_teach != "undefined") {
        setTimesCantTeach(originalCourse.times_cant_teach)
      }

      if (typeof originalCourse.course_number != "undefined") {
        setCourseNumber(originalCourse.course_number)
      }

      if (typeof originalCourse.is_cross_listed != "undefined") {
        setIsCrossListed(originalCourse.is_cross_listed ? 1 : 0)
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

  function getFinalTime() {
    if (finalTime !== 'Other') {
      return finalTime;
    } else {
      return otherFinalTime;
    }
  }

  function getTimeRanking() {
    var timeRanking = [];
    if (time1 != '') {
      timeRanking.push(time1);
    }
    if (time2 != '') {
      timeRanking.push(time2);
    }
    if (time3 != '') {
      timeRanking.push(time3);
    }
    return timeRanking
  }

  async function hasError() {
    if (courseTitle === "") {
      openAlert("Please fill in course title.")
      return true;
    } else if (description === "") {
      openAlert("Please fill in course description.")
      return true;
    } else if (courseType === "") {
      openAlert("Please fill in course type.")
      return true;
    } else if (semester === "") {
      openAlert("Please fill in semester.")
      return true;
    } else if (isNaN(year)) {
      openAlert("Year has to be a numerical value")
      return true;
    } else if (professors.length === 0) {
      openAlert("Please fill in professors.")
      return true;
    } else if (levels.length === 0) {
      openAlert("Please fill in level.")
      return true;
    } else if ((time1 === "" || time2 === "" || time3 === "") && !isCrossListed) {
      openAlert("Please rank three times for Time Ranking.")
      return true;
    } else if ((time1 === time2 || time2 === time3 || time1 === time3)  && !isCrossListed) {
      openAlert("Please enter three different times for Time Ranking.")
      return true;
    } else if (isUndergrad && geography.length === 0) {
      openAlert("Please select geography.")
      return true;
    } else if (!isRegular && profType === '') {
      openAlert('You have indicated that you are not a regular professor. In that case, please indicate your role.')
      return true;
    } else if (transcriptTitle.length > 30) {
      openAlert('Transcript title must be 30 characters or less.')
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
      on_leave_fall: leaveFall === 1,
      on_leave_spring: leaveSpring === 1,
      is_regular_prof: isRegular === 1,
      prof_type: profType,
      course_title: courseTitle,
      transcript_title: transcriptTitle,
      description: description,
      professors: profId,
      syllabus_link: syllabusLink,
      levels: levels,
      is_undergrad: isUndergrad,
      is_RPP: rpp,
      is_WRIT: writ,
      is_CBLR: cblr,
      is_cross_listed: isCrossListed === 1,
      is_premodern: premodern,
      course_type: courseType,
      is_remote_accessible: remoteAccessible,
      is_remote_only: remoteOnly,
      semester: semester,
      year: year,
      time_ranking: getTimeRanking(),
      times_cant_teach: timesCantTeach,
      geography: geography,
      course_number: courseNumber,
      proposal_status: originalCourse!.proposal_status!,
      further_notes: notes,
      final_time: getFinalTime(),
      _id: originalCourse!._id!
    }
    const success = await editCourse(proposedCourse);
    if (success) {
      if (user?.role === "manager" || user?.role === 'curriculum coordinator') {
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
      on_leave_fall: leaveFall === 1,
      on_leave_spring: leaveSpring === 1,
      is_regular_prof: isRegular === 1,
      prof_type: profType,
      course_title: courseTitle,
      transcript_title: transcriptTitle,
      description: description,
      professors: profId,
      syllabus_link: syllabusLink,
      levels: levels,
      is_undergrad: isUndergrad,
      is_RPP: rpp,
      is_WRIT: writ,
      is_CBLR: cblr,
      is_cross_listed: isCrossListed === 1,
      is_premodern: premodern,
      course_type: courseType,
      is_remote_accessible: remoteAccessible,
      is_remote_only: remoteOnly,
      semester: semester,
      year: year,
      time_ranking: getTimeRanking(),
      times_cant_teach: timesCantTeach,
      geography: geography,
      final_time: getFinalTime(),
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
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2} maxWidth={1000} mx="auto">

        {(user?.role === "manager" || user?.role === "curriculum coordinator") &&
          <Grid item xs={11} container spacing={2}>
            <Grid item xs={2.2}>
              <Typography variant="body1" fontWeight="bold" align='right'>Course Number</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size='small'
                value={courseNumber}
                onChange={(e) => setCourseNumber(e.target.value)}
              />
              <FormHelperText sx={{ fontSize: '14px' }}>Full course number, including dept. abbreviation (e.g. HIST0150A), entered by manager.</FormHelperText>
            </Grid>
          </Grid>}

        {(user?.role === "manager" || user?.role === "curriculum coordinator") &&
          <Grid item xs={11} container spacing={2}>
            <Grid item xs={2.2}>
              <Typography variant="body1" fontWeight="bold" align='right'>Final Time</Typography>
            </Grid>

            <Grid marginLeft={1.8} marginTop={2}>
              <FormControl style={{ minWidth: 120 }}>
                <Select
                  size='small'
                  fullWidth
                  value={finalTime}
                  onChange={(e) => { setFinalTime(e.target.value) }}
                >
                  <MenuItem aria-label="None" value="Other">Other</MenuItem>
                  {TIMES.map((time, index) =>
                    <MenuItem key={index} value={time}>{TIME_STRINGS[index]}</MenuItem>
                  )}
                </Select>
              </FormControl>
              <FormHelperText sx={{ fontSize: '14px' }}>Time slot for the course, entered by manager.</FormHelperText>
            </Grid>

            {finalTime === 'Other' && <>
              <Grid marginLeft={1} marginTop={2}>
                <TextField
                  size='small'
                  placeholder='Other Final Time'
                  onChange={(e) => setOtherFinalTime(e.target.value)}
                />
              </Grid>
            </>}

          </Grid>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Regular Professor?</Typography>
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
          <FormHelperText sx={{ fontSize: '14px' }}>Are you a regular tenure-track/tenured history department faculty member?</FormHelperText>
        </Grid>


        {!isRegular && <>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Role</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              size='small'
              fullWidth
              placeholder={'DFF, Lecturer, VAP, HAT, etc.'}
              value={profType}
              onChange={(e) => setProfType(e.target.value)}
            />
          </Grid>

        </>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in fall?</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <Select
            size='small'
            autoWidth
            value={leaveFall}
            onChange={(e) => {
              let val = e.target.value as number
              setleaveFall(val)
            }
            }
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in spring?</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <Select
            size='small'
            autoWidth
            value={leaveSpring}
            onChange={(e) => {
              let val = e.target.value as number
              setleaveSpring(val)
            }
            }
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course scheduled via another unit?</Typography>
        </Grid>
        <Grid item xs={9.5}>
          <Select
            size='small'
            autoWidth
            value={isCrossListed}
            onChange={(e) => {
              let val = e.target.value as number
              setIsCrossListed(val)
            }
            }
          >
            <MenuItem value={1}>Yes</MenuItem>
            <MenuItem value={0}>No</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title</Typography>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Transcript Title</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            required
            helperText={transcriptTitle.length.toString() + "/30 characters"}
            value={transcriptTitle}
            onChange={(e) => setTranscriptTitle(e.target.value)}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Professor(s)</Typography>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Semester</Typography>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level</Typography>
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
          <FormHelperText sx={{ fontSize: '14px' }}>(select all that apply)</FormHelperText>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Type</Typography>
        </Grid>
        <Grid item xs={10}>
          <Select
            size='small'
            autoWidth
            value={courseType}
            onChange={(e) => { setCourseType(e.target.value) }}
          >
            {COURSE_TYPES.map((type, index) => (
              <MenuItem key={index} value={type}>{type}</MenuItem>))}
          </Select>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography</Typography>
        </Grid>
        <Grid item xs={10}>
          <FormControl fullWidth>
            <Select
              size='small'
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
              <MenuItem value="">
                <ListItemText primary="" />
              </MenuItem>
              {GEO_REGIONS.map((name, index) => (
                <MenuItem key={index} value={name}>
                  <ListItemText primary={name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormHelperText sx={{ fontSize: '14px' }}>The geographic region that best fits the content of the course (only required for undergraduate courses).</FormHelperText>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time Ranking</Typography>
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
          <FormHelperText sx={{ fontSize: '14px' }}>Your preference ranking for course time slots, which will inform the final time choice.</FormHelperText>
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
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Unavailable Times</Typography>
        </Grid>
        <Grid item xs={3.33}>
          <FormControl fullWidth>
            <Select
              size='small'
              autoWidth
              multiple
              value={timesCantTeach}
              onChange={(event) => {
                const {
                  target: { value },
                } = event;
                setTimesCantTeach(
                  typeof value === 'string' ? value.split(',') : value,
                );
              }}
              renderValue={(selected) => selected.join(', ')}
            >
              {TIMES.map((time, index) =>
                <MenuItem key={index} value={time}>
                  <Checkbox checked={timesCantTeach.indexOf(time) > -1} />
                  <ListItemText primary={TIME_STRINGS[index]} />
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <FormHelperText sx={{ fontSize: '14px' }}>Any course time slots during which you are unavailable to teach (select all that apply).</FormHelperText>
        </Grid>
        <Grid item xs={6.66}></Grid>
        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            value={description}
            helperText={wordCounter() + " words"}
            multiline={true}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormHelperText sx={{ fontSize: '14px' }}>A short paragraph describing the course content, which will end up on CAB.</FormHelperText>
        </Grid>

        <Grid item xs={4.5}></Grid>
        <Grid item xs={3}>
          <FormGroup>
            <Tooltip title="Subject to CCC approval in accordance with their guidelines - syllabus submission required" placement="left">
              <FormControlLabel control={<Checkbox checked={writ} onClick={(e) => { setWrit((e.target as HTMLInputElement).checked) }} />} label="WRIT" />
            </Tooltip>
            <Tooltip title="Subject to CCC approval in accordance with their guidelines - syllabus submission required" placement="left">
              <FormControlLabel control={<Checkbox checked={rpp} onClick={(e) => { setRPP((e.target as HTMLInputElement).checked) }} />} label="RPP" />
            </Tooltip>
            <Tooltip title="Must be 2/3 prior to 1800" placement="left">
              <FormControlLabel control={<Checkbox checked={premodern} onClick={(e) => { setPremodern((e.target as HTMLInputElement).checked) }} />} label="Premodern" />
            </Tooltip>
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox checked={remoteOnly} onClick={(e) => { setRemoteOnly((e.target as HTMLInputElement).checked) }} />} label="Remote Only" />
            <FormControlLabel control={<Checkbox checked={remoteAccessible} onClick={(e) => { setRemoteAccessible((e.target as HTMLInputElement).checked) }} />} label="Remote Accessible" />
            <FormControlLabel control={<Checkbox checked={cblr} onClick={(e) => { setCBLR((e.target as HTMLInputElement).checked) }} />} label="CBLR" />
          </FormGroup>
        </Grid>
        <Grid item xs={1.5}></Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Further Notes</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            value={notes}
            multiline={true}
            rows={3}
            onChange={(e) => setNotes(e.target.value)}
          />
          <FormHelperText sx={{ fontSize: '14px' }}>Any extra notes you would like to add that do not fit into the other fields.</FormHelperText>
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
          <FormHelperText sx={{ fontSize: '14px' }}>Please remember that if you are a regular professor teaching for the second time, you must add a link to your syllabus. You may also email a copy of your syllabus to the Student Affairs Manager.</FormHelperText>
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
