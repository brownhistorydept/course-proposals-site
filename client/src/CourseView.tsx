import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import {useLocation} from 'react-router'
import { fetchProfessors } from "./utils/professors";
import {Link} from 'react-router-dom';
import { acceptRejectCourse } from './utils/courses';
import { useNavigate } from 'react-router-dom';



function CourseViewView() {

  const [user, setUser] = useState<IUser>();
  const [reason, setReason] = useState('');
  const navigate = useNavigate();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser, setError);
        }
        getUser();
        
    }, []);

    const [professorValues, setProfessorsValues] = useState<IUser[]>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getProfessors() {
            await fetchProfessors(setProfessorsValues, setError);
        }
        getProfessors();
        
    }, []);

    interface CustomizedState {
        course: any,
        approve: boolean,
        edit: boolean,
        new_proposal: boolean
      }
      
    const location = useLocation();
    const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
    const myState = state;

    const course = myState.course;
    const approve = myState.approve;
    const edit = myState.edit;
    const new_proposal = myState.new_proposal;

    const [professors, setProfessors] = useState<string[]>([]);
    
    // console.log(course)

    const courseNumber = course["course_number"].split(" ")[1];
    const courseTitle = course["course_title"]
    const courseYear = course["year"]
    const courseDescription = course["description"]
    const courseSemester = course["semester"]
    var courseLevel = ""
    const courseGeography = course["geography"][0]

    const courseProfessors = course["professors"]
    // console.log(courseProfessors)

    var profList = []

    for (let i = 0; i < courseProfessors.length; i++) {
      profList.push(courseProfessors[i].displayName) 
    }

    var profString = profList.join(", ")

    // console.log(profString)

    if (course["is_undergrad"]) {
        courseLevel = "Undergraduate"
    } else {
        courseLevel = "Graduate"
    }

    // console.log(Math.floor(courseDescription.split(" ").length / 12))
    // console.log(courseDescription.split(" "))


    // console.log(state);
    // console.log(state.edit);

    // if (state !== undefined && state !== null && state.constructor == Object) {

    // }

    // if (state instanceof json) {
    //     console.log(state)
    // }
    

    // console.log(props.location)
    // let id = props.location.state?.id;
    // console.log(id);

    // if (props.location.state.courseinfo) {
    //     console.log(props.location.state.course);
    // }

  // const [crn, setCrn] = useState(0);

  return (
    <div className="CourseProposal">

      <NavBar user = {user}/>
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
          }}>
        <br/>
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

      <Grid container spacing={2} maxWidth={1000} mx="auto">
              <Grid item xs={2}>
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Number *</Typography>
              </Grid>
              <Grid item xs={0.5}>
              <Typography variant="body1" width="2">HIST</Typography>
              </Grid>
              <Grid item xs={9.5}>
              <TextField
                variant="standard"
                InputProps={{
                       disableUnderline: true,
                       readOnly: true,
                     }}
                size='small'
                value = {courseNumber}
                sx = {{border: 0}}
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title *</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                fullWidth
                value = {courseTitle}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  readOnly: true,
                }}
                sx = {{border: 0}}
              />
              </Grid>
              
              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Professor(s)</Typography>
              </Grid>
              {/* <FormControl fullWidth> */}
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  size='small'
                  value = {profString}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                  }}
                />
          
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Semester *</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                value = {courseSemester + " " + courseYear}
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  readOnly: true,
                }}
                sx={{marginRight: 1}}
              >
              </TextField>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level *</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  readOnly: true,
                }}
                value = {courseLevel}
              >
                <MenuItem value={1}>Undergraduate</MenuItem>
                <MenuItem value={0}>Graduate</MenuItem>
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
                value = {courseGeography}
                
              >
              </TextField>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time Ranking*</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                variant="standard"
                InputProps={{
                    disableUnderline: true,
                    readOnly: true,
                  }}
                value = {course.time_ranking.join(", ")}
                sx={{marginRight: 1}}
              >
              </TextField>
             
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description* </Typography>
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
                rows={Math.floor(courseDescription.split(" ").length / 13)}
                value = {courseDescription}
              />
              </Grid>

              <Grid item xs={4}></Grid>
              <Grid item xs={3}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox disabled checked={course.is_capstone}/>} label="Capstone" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_FYS}/>} label="First-Year Seminar" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_SYS}/>} label="Second-Year Seminar" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_intro}/>} label="Intro" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_lecture}/>} label="Lecture" />
                </FormGroup>
              </Grid>
              <Grid item xs={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox disabled checked={course.is_WRIT}/>} label="WRIT" />
                    <FormControlLabel control={<Checkbox disabled checked={course.is_RPP}/>} label="RPP" />
                    <FormControlLabel control={<Checkbox disabled checked={course.is_remote}/>} label="Remote" />
                    <FormControlLabel control={<Checkbox disabled checked={course.is_FYS}/>} label="Premodern" />
                </FormGroup>
              </Grid>
              <Grid item xs={2}></Grid>
              
            {approve&&<>
              
                <Grid item xs={2}>
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Comments for Professor</Typography>
                </Grid>
                <Grid item xs={10}>
                <TextField
                    fullWidth
                    value={reason}
                      multiline={true}
                      rows={5}
                      onChange={(e)=>setReason(e.target.value)}
                    />
                </Grid>
              
                <Grid marginX="auto" marginY="20px">
                <Button 
                  variant="contained" 
                  sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                  onClick={async () => {
                    const success = await acceptRejectCourse(course, true);
                    if (success){
                      alert("Course successfully accepted.")
                      navigate('/review_courses');
                    }else{
                      alert("Error accepting course")
                    }
                    }}>
                    <Typography gutterBottom variant="body1">
                      Accept
                    </Typography>
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                    onClick={async () => {
                      const success = await acceptRejectCourse(course, false);
                      if (success){
                        alert("Course successfully rejected.")
                        navigate('/review_courses');
                      }else{
                        alert("Error rejecting course")
                      }
                    }}>
                      <Typography gutterBottom variant="body1">
                        Reject
                      </Typography>
                    </Button>
                  </Grid>
                {/* </Grid> */}
           </> }

            {edit&&<Grid item marginX="auto" >
            <Link style={{ textDecoration: 'none' }}to={"/course_proposal"} state = {{course:course, edit:true, existing:false}}>
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
            >
                  <Typography gutterBottom variant="body1">
                    Edit
                  </Typography>
              </Button>
              </Link>
            </Grid>}

            {new_proposal&&<Grid item marginX="auto" >
            <Link style={{ textDecoration: 'none' }}to={"/course_proposal"} state = {{course:course, edit:false, existing:true}}>
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
            >
                  <Typography gutterBottom variant="body1">
                    New Proposal
                  </Typography>
              </Button>
              </Link>
            </Grid>}

          </Grid>

      

    </div>
  );
}

export default CourseViewView;

