import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { submitCourse } from './utils/courses';
import { ICourse } from '../../server/src/models/Course';


function CourseProposal() {

  const [user, setUser] = useState<IUser>();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser, setError);
        }
        getUser();
        
    }, []);

  const [courseNumber, setCourseNumber] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  // const [crn, setCrn] = useState(0);
  const [isUndergrad, setIsUndergrad] = useState(1);
  const [geography, setGeography] = useState('');
  const [description, setDescription] = useState('');
  const [capstone, setCapstone] = useState(false);
  const [fys, setFys] = useState(false);
  const [sys, setSys] = useState(false);
  const [intro, setIntro] = useState(false);
  const [lecture, setLecture] = useState(false);
  const [writ, setWrit] = useState(false);
  const [diap, setDiap] = useState(false);
  const [remote, setRemote] = useState(false);
  const [premodern, setPremodern] = useState(false);
  const [semester, setSemester] = useState('Fall');
  const [year, setYear] = useState(0);
  const [time, setTime] = useState('A');
  const [success, setSuccess] = useState(false);

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
                Course Proposal
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
                size='small'
                required
                onChange={(e)=>setCourseNumber(e.target.value)}
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title *</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                fullWidth
                required
                onChange={(e)=>setCourseTitle(e.target.value)}
              />
              </Grid>
              
              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Professor</Typography>
              </Grid>
              <Grid item xs={10}>
              <Typography variant="body1" my="auto">{user?.displayName}</Typography>
              </Grid>

              {/* <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>CRN</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                onChange={(e)=>setCrn(parseInt(e.target.value))}
              />
              </Grid> */}

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Semester *</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                size='small'
                autoWidth
                defaultValue={"Fall"}
                onChange={(e)=>{
                  setSemester(e.target.value)
                }}
                sx={{marginRight: 1}}
              >
                <MenuItem value={"Fall"}>Fall</MenuItem>
                <MenuItem value={"Winter"}>Winter</MenuItem>
                <MenuItem value={"Spring"}>Spring</MenuItem>
                <MenuItem value={"Summer"}>Summer</MenuItem>
              </Select>
              <TextField
                size='small'
                onChange={(e)=>{setYear(parseInt(e.target.value))}}
                label="Year"
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level *</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                size='small'
                autoWidth
                defaultValue={1}
                onChange={(e)=>{
                  let val = e.target.value as number
                  setIsUndergrad(val)
                }
                  }
              >
                <MenuItem value={1}>Undergraduate</MenuItem>
                <MenuItem value={0}>Graduate</MenuItem>
              </Select>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                size='small'
                autoWidth
                defaultValue = ""
                onChange={(e)=>setGeography(e.target.value)}
                
              >
                <MenuItem value=""><em>N/A</em></MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="East Asia">East Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Latin America">Latin America</MenuItem>
                <MenuItem value="MESA">MESA</MenuItem>
                <MenuItem value="North America">North America</MenuItem>
                <MenuItem value="Global">Global</MenuItem>
              </Select>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Time *</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                size='small'
                autoWidth
                defaultValue={"A"}
                onChange={(e)=>{setTime(e.target.value)}}
              >
                <MenuItem value={"A"}>A</MenuItem> <MenuItem value={"B"}>B</MenuItem> <MenuItem value={"C"}>C</MenuItem>
                <MenuItem value={"D"}>D</MenuItem> <MenuItem value={"E"}>E</MenuItem> <MenuItem value={"F"}>F</MenuItem>
                <MenuItem value={"G"}>G</MenuItem> <MenuItem value={"H"}>H</MenuItem> <MenuItem value={"I"}>I</MenuItem>
                <MenuItem value={"J"}>J</MenuItem> <MenuItem value={"K"}>K</MenuItem> <MenuItem value={"L"}>L</MenuItem>
                <MenuItem value={"M"}>M</MenuItem> <MenuItem value={"N"}>N</MenuItem> <MenuItem value={"O"}>O</MenuItem>
                <MenuItem value={"P"}>P</MenuItem> <MenuItem value={"Q"}>Q</MenuItem> <MenuItem value={"T"}>T</MenuItem>
              </Select>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description* </Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
              fullWidth
                multiline={true}
                rows={5}
                onChange={(e)=>setDescription(e.target.value)}
              />
              <Typography variant="body2" mx="auto">* required fields </Typography>
              </Grid>

              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox onClick={(e)=>{setCapstone((e.target as HTMLInputElement).checked)}}/>} label="Capstone" />
                  <FormControlLabel control={<Checkbox onClick={(e)=>{setFys((e.target as HTMLInputElement).checked)}}/>} label="First-Year Seminar" />
                  <FormControlLabel control={<Checkbox onClick={(e)=>{setSys((e.target as HTMLInputElement).checked)}}/>} label="Sophomore Seminar" />
                  <FormControlLabel control={<Checkbox onClick={(e)=>{setIntro((e.target as HTMLInputElement).checked)}}/>} label="Intro" />
                  <FormControlLabel control={<Checkbox onClick={(e)=>{setLecture((e.target as HTMLInputElement).checked)}}/>} label="Lecture" />
                </FormGroup>
              </Grid>
              <Grid item xs={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox onClick={(e)=>{setWrit((e.target as HTMLInputElement).checked)}}/>} label="WRIT" />
                    <FormControlLabel control={<Checkbox onClick={(e)=>{setDiap((e.target as HTMLInputElement).checked)}}/>} label="DIAP" />
                    <FormControlLabel control={<Checkbox onClick={(e)=>{setRemote((e.target as HTMLInputElement).checked)}}/>} label="Remote" />
                    <FormControlLabel control={<Checkbox onClick={(e)=>{setPremodern((e.target as HTMLInputElement).checked)}}/>} label="Premodern" />
                </FormGroup>
              </Grid>
              <Grid item xs={3}></Grid>
              
              
            <Grid item marginX="auto" >
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                onClick={() => {
                  if (courseNumber === "" || courseTitle === "" || description==="" || year===0 || year===NaN){
                    alert("Please fill all required fields")
                  } else if (isNaN(parseInt(courseNumber))){ 
                    alert("Course Number has to be a numerical value")
                  } else if (isNaN(year)){ 
                    alert("Year has to be a numerical value")
                  } else {
                    var undergrad = isUndergrad === 1
                    var course = {
                      user: user,
                      course_number: `HIST ${courseNumber}`,
                      // crn: crn,
                      course_title: courseTitle,
                      description: description,
                      professors: [user],
                      is_undergrad: undergrad,
                      is_DIAP: diap,
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
                      final_time: time,
                      geography: [geography],
                      proposal_status: "under review by director",
                      course_status: "new"
                  };
                    // submitCourse(setSuccess, setError, course)
                  }
                }}>
                  <Typography gutterBottom variant="body1">
                    Submit
                  </Typography>
              </Button>
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                onClick={() => {
                  window.location.reload();
                }}>
                  <Typography gutterBottom variant="body1">
                    Clear
                  </Typography>
              </Button>
            </Grid>

          </Grid>

      

    </div>
  );
}

export default CourseProposal;
