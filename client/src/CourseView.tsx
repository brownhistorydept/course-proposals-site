import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom';
import { acceptRejectCourse } from './utils/courses';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogTitle, } from '@mui/material';

function CourseView() {
  const [user, setUser] = useState<IUser>();
  const [alertTitle, setAlertTitle] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertRedirect, setAlertRedirect] = useState(false);
  const navigate = useNavigate();

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  interface CustomizedState {
    course: any,
    canAccept: boolean,
    canEdit: boolean,
    canNewProposal: boolean,
    isRestrictedView: boolean
  }

  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  const myState = state;

  const course = myState.course;
  const canAccept = myState.canAccept;
  const canEdit = myState.canEdit;
  const canNewProposal = myState.canNewProposal;
  const isRestrictedView = myState.isRestrictedView;

  const courseNumber = course["course_number"]
  const courseTitle = course["course_title"]
  const courseYear = course["year"]? course["year"] : ''
  const courseDescription = course["description"]
  const courseSemester = course["semester"]? course["semester"] : ''
  const courseLevels = course["levels"]?.join(', ') ?? ''
  const courseGeography = course["geography"]
  const courseFinalTime = course["final_time"]
  const courseIsRegular = course["is_regular_prof"] ? "Yes" : "No"
  const courseLeaveFall = course["on_leave_fall"] ? "Yes" : "No"
  const courseLeaveSpring = course["on_leave_spring"] ? "Yes" : "No"
  const courseSyllabusLink = course["syllabus_link"]
  const courseFurtherNotes = course["further_notes"]
  const courseComments = course["comments"]
  const courseProfessors = course["professors"]

  const [reason, setReason] = useState(courseComments);

  var profList = []

  for (let i = 0; i < courseProfessors.length; i++) {
    profList.push(courseProfessors[i].displayName)
  }

  const editCourse = {
    ...course,
    professors: profList
  }

  var proposalProfessors = user ? [user.displayName] : [""]
  if (user?.role === "manager") {
    proposalProfessors = profList
  }

  // course to be used for a new proposal; reset year, semester, professor
  const proposalCourse = {
    ...course,
    professors: proposalProfessors,
    year: new Date().getFullYear(),
    semester: ''
  }

  var profString = profList.join(", ")
  var geoString = courseGeography.length === 0 ? "" : courseGeography.join(", ")

  const openAlert = (title: string, redirect: boolean) => {
    setAlertTitle(title);
    setAlertOpen(true);
    setAlertRedirect(redirect);
  }

  // const finalView = user?.role === 'default' || (user?.role === 'professor' && course.proposal_status === 'accepted by CCC')

  return (
    <div className="CourseView">

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
            Course Information
          </Typography>

        </Box>
      </Box>

      <Grid container spacing={2} maxWidth={1000} mx="auto" marginBottom='20px'>

        {!isRestrictedView && <>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" align='right'>Regular Professor?</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size='small'
              value={courseIsRegular}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" align='right'>Planning to take leave in fall?</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size='small'
              value={courseLeaveFall}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" align='right'>Planning to take leave in spring?</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              fullWidth
              size='small'
              value={courseLeaveSpring}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
            />
          </Grid>

          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Number</Typography>
          </Grid>
          <Grid item xs={9.5}>
            <TextField
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
              size='small'
              value={courseNumber}
              sx={{ border: 0 }}
            />
          </Grid>
        </>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            value={courseTitle}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            sx={{ border: 0 }}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Professor(s)</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            size='small'
            value={profString}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Semester</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            value={courseSemester + " " + courseYear}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            sx={{ marginRight: 1 }}
          >
          </TextField>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            fullWidth
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            value={courseLevels}
          >
          </TextField>
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            size='small'
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            value={geoString}

          >
          </TextField>
        </Grid>

        {!isRestrictedView && <>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time Ranking</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              size='small'
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
              value={course.time_ranking.join(", ")}
              sx={{ marginRight: 1 }}
            >
            </TextField>
          </Grid>
        </>}

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" align='right'>Time</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            size='small'
            value={courseFinalTime}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          />
        </Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
            fullWidth
            multiline={true}
            rows={courseDescription ? Math.floor(courseDescription.split(" ").length / 13) : 0}
            value={courseDescription}
          />
        </Grid>

        <Grid item xs={4.5}></Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox disabled checked={course.is_capstone} />} label="Capstone" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_FYS} />} label="First-Year Seminar" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_SYS} />} label="Second-Year Seminar" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_intro} />} label="Intro" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_lecture} />} label="Lecture" />
          </FormGroup>
        </Grid>
        <Grid item xs={3}>
          <FormGroup>
            <FormControlLabel control={<Checkbox disabled checked={course.is_WRIT} />} label="WRIT" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_RPP} />} label="RPP" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_remote_accessible} />} label="Remote" />
            <FormControlLabel control={<Checkbox disabled checked={course.is_FYS} />} label="Premodern" />
          </FormGroup>
        </Grid>
        <Grid item xs={1.5}></Grid>

        <Grid item xs={2}>
          <Typography variant="body1" fontWeight="bold" align='right'>Syllabus Link</Typography>
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            size='small'
            value={courseSyllabusLink}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              readOnly: true,
            }}
          />
        </Grid>

        {!isRestrictedView && <>
          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Further Notes</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              variant="standard"
              InputProps={{
                disableUnderline: true,
                readOnly: true,
              }}
              fullWidth
              multiline={true}
              rows={courseFurtherNotes ? Math.floor(courseFurtherNotes.split(" ").length / 13) : 1}
              value={courseFurtherNotes}
            />
          </Grid>
        </>}

        {canAccept && <>

          <Grid item xs={2}>
            <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Comments for Professor</Typography>
          </Grid>
          <Grid item xs={10}>
            <TextField
              style={{ width: 800 }}
              value={reason}
              multiline={true}
              rows={5}
              onChange={(e) => setReason(e.target.value)}
            />
          </Grid> </>}

      </Grid>

      <Grid container spacing={3} justifyContent="center" paddingBottom={2}>

        {/* purely aesthetics, just to make the buttons line up with the checkboxes and not look off */}
        <Grid item xs={1}></Grid>

        {canAccept && <>
          <Button
            style={{ textDecoration: 'none', marginTop: "20px" }}
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
            onClick={async () => {
              const success = await acceptRejectCourse(course, true, reason);
              if (success) {
                openAlert('Course successfully accepted', true);
              } else {
                openAlert('Error accepting course', false);
              }
            }}>
            <Typography gutterBottom variant="body1">
              Accept
            </Typography>
          </Button>
          <Button
            style={{ textDecoration: 'none', marginTop: "20px" }}
            variant="contained"
            sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
            onClick={async () => {
              const success = await acceptRejectCourse(course, false, reason);
              if (success) {
                openAlert('Course successfully rejected', true);
              } else {
                openAlert('Error rejecting course', false);
              }
            }}>
            <Typography gutterBottom variant="body1">
              Reject
            </Typography>
          </Button>
        </>}

        {canEdit && <>
          <Link style={{ textDecoration: 'none', marginTop: "20px" }} to={"/course_proposal"} state={{ course: editCourse, isEditing: true, isNewProposal: false }}>
            <Button
              variant="contained"
              sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
            >
              <Typography gutterBottom variant="body1">
                Edit
              </Typography>
            </Button>
          </Link>
        </>}


        {canNewProposal && <>
          <Grid item marginX="auto" >
            <Link style={{ textDecoration: 'none' }} to={"/course_proposal"} state={{ course: proposalCourse, isEditing: false, isNewProposal: true }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", backgroundColor: "#992525", mx: 1 }}
              >
                <Typography gutterBottom variant="body1">
                  New Proposal
                </Typography>
              </Button>
            </Link>
          </Grid>
        </>}

      </Grid>

      <Dialog open={alertOpen}>
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogActions>
          <Button autoFocus onClick={() => {
            setAlertOpen(false);
            if (alertRedirect) {
              navigate('/review_courses');
            }
          }}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CourseView;
