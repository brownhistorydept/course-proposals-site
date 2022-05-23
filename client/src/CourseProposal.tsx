import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
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
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { fetchProfessors } from "./utils/professors";
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router'
import { ICourse } from "../../server/src/models/Course";


function CourseProposal() {

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser);
        }
        getUser();
        
    }, []);

  const [professorValues, setProfessorsValues] = useState<IUser[]>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getProfessors() {
            await fetchProfessors(setProfessorsValues);
        }
        getProfessors();
        
    }, []);

  interface CustomizedState {
    course: any,
    edit: boolean,
    existing: boolean
  }
    
  const location = useLocation();
  const state = location.state as CustomizedState; // Type Casting, then you can get the params passed via router
  window.history.replaceState(null, "")
  const myState = state;

  var course = {} as ICourse;
  var edit = false;
  var existing = false;
  if (myState !== null){
    course = myState.course;
    edit = myState.edit;
    existing = myState.existing;
  }
 
    const [isRegular, setRegular] = useState(1);
    const [leaveSpring, setleaveSpring] = useState(false);
    const [leaveFall, setleaveFall] = useState(false);
    const [notes, setNotes] = useState('');
    const [syllabusLink, setSyllabusLink] =  useState('');

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

    useEffect(() => {
      if (myState != null){
        if (typeof course.course_number != "undefined") {
          setCourseNumber(course.course_number.split(" ")[1])
        }
        setCourseTitle(course.course_title)
        var profList = []
        for (let i = 0; i < course.professors.length; i++) {
          const name = course.professors[i] as unknown as IUser
          profList.push(name.displayName) 
        }
        setProfessors(profList)
        setIsUndergrad(course.is_undergrad?1:0)
        if(typeof course.geography !== "undefined"){
          setGeography(course.geography)
        }
        
        setDescription(course.description)
        if (typeof course.is_capstone != "undefined") {
          setCapstone(course.is_capstone)
        }
        if (typeof course.is_FYS != "undefined") {
          setSys(course.is_FYS)
        }
        if (typeof course.is_SYS != "undefined") {
          setSys(course.is_SYS)
        }
        if (typeof course.is_intro != "undefined") {
          setIntro(course.is_intro)
        }
        if (typeof course.is_lecture != "undefined") {
          setLecture(course.is_lecture)
        }
        if (typeof course.is_WRIT != "undefined") {
          setWrit(course.is_WRIT)
        }
        if (typeof course.is_RPP != "undefined") {
          setRPP(course.is_RPP)
        }
        if (typeof course.is_remote != "undefined") {
          setRemote(course.is_remote)
        }
        if (typeof course.is_Premodern != "undefined") {
          setPremodern(course.is_Premodern)
        }
        if (typeof course.is_CBLR != "undefined") {
          setCBLR(course.is_CBLR)
        }
      
        setSemester(course.semester)
        setYear(course.year)
        setTime1(course.time_ranking[0])
        setTime2(course.time_ranking[1])
        setTime3(course.time_ranking[2])
      }

    }, []);

  const geographyValues = [
    'Africa',"East Asia", "Europe", "Latin America", "Middle East - South Asia (MESA)", "North America","Global"
  ]
  const timeValues = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "T"]
  const timeStrings = ["A: MWF 8-8:50", "B: MWF 9-9:50", "C: MWF 10-10:50", "D: MWF 11-11:50", 
                        "E: MWF 12-12:50", "F: MWF 1-1:50", "G: MWF 2-2:50", "H: TTh 9-10:20", 
                        "I: TTh 10:30-11:50", "J: TTh 1-2:20", "K: TTh 2:30-3:50", 
                        "L: TTh 6:40-8", "M: M 3-5:30", "N: W 3-5:30", "O: F 3-5:30", 
                        "P: T 4-6:30", "Q: Th 4-6:30", "T: MW 3-4:20"]
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
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Regular Professor? *</Typography>
              </Grid>
              <Grid item xs={9.5}>
              <Select
                size='small'
                autoWidth
                value={isRegular}
                onChange={(e)=>{
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
                <FormControlLabel control={<Checkbox checked={leaveFall} onClick={(e)=>{setleaveFall((e.target as HTMLInputElement).checked)}}/>} label="" />
              </Grid>

              <Grid item xs={2}>
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Planning to take leave in spring?</Typography>
              </Grid>
              <Grid item xs={9.5}>
                <FormControlLabel control={<Checkbox checked={leaveSpring} onClick={(e)=>{setleaveSpring((e.target as HTMLInputElement).checked)}}/>} label="" />
              </Grid>


              <Grid item xs={2}>
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Number</Typography>
              </Grid>
              <Grid item xs={0.5}>
              <Typography variant="body1" width="2">HIST</Typography>
              </Grid>
              <Grid item xs={9.5}>
              <TextField
                size='small'
                required
                value={courseNumber}
                onChange={(e)=>setCourseNumber(e.target.value)}
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title *</Typography>
              </Grid>
              <Grid item xs={10}>
              {myState === null&&<TextField
                size='small'
                fullWidth
                required
                onChange={(e)=>setCourseTitle(e.target.value)}
              />}
               {myState !== null&&<TextField
                size='small'
                fullWidth
                required
                value={courseTitle}
                onChange={(e)=>setCourseTitle(e.target.value)}
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
                  onChange={(event)=>{
                    const {
                      target: { value },
                    } = event;
                    setProfessors(
                      typeof value === 'string' ? value.split(',') : value,
                    );
                  }}
                  renderValue={(selected) => selected.join(', ')}
                >
                  {professorValues?.map((prof) => (
                    <MenuItem key={prof.displayName} value={prof.displayName}>
                      <Checkbox checked={professors.indexOf(prof.displayName) > -1} />
                      <ListItemText primary={prof.displayName} />
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

              {isUndergrad == 1 &&<Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Geography</Typography>
              </Grid>}
              {isUndergrad == 1 &&<Grid item xs={10}>
              <FormControl fullWidth>
                <Select
                  size='small'
                  multiple
                  value={geography}
                  onChange={(event)=>{
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
                    onChange={(e)=>{setTime1(e.target.value)}}
                  >
                  {timeValues.map((time, index)=>
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
                    onChange={(e)=>{setTime2(e.target.value)}}
                  >
                  {timeValues.map((time, index)=>
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
                    onChange={(e)=>{setTime3(e.target.value)}}
                  >
                  {timeValues.map((time, index)=>
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
                onChange={(e)=>setDescription(e.target.value)}
              />
              </Grid>
              
              {isUndergrad == 1 &&<Grid item xs={3}></Grid>}
              {isUndergrad == 1 &&<Grid item xs={3}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox checked={capstone} onClick={(e)=>{setCapstone((e.target as HTMLInputElement).checked)}}/>} label="Capstone" />
                  <FormControlLabel control={<Checkbox checked={fys} onClick={(e)=>{setFys((e.target as HTMLInputElement).checked)}}/>} label="First-Year Seminar" />
                  <FormControlLabel control={<Checkbox checked={sys} onClick={(e)=>{setSys((e.target as HTMLInputElement).checked)}}/>} label="Second-Year Seminar" />
                  <FormControlLabel control={<Checkbox checked={intro} onClick={(e)=>{setIntro((e.target as HTMLInputElement).checked)}}/>} label="Intro" />
                  <FormControlLabel control={<Checkbox checked={lecture} onClick={(e)=>{setLecture((e.target as HTMLInputElement).checked)}}/>} label="Lecture" />
                </FormGroup>
              </Grid>}

              {isUndergrad == 1 &&<Grid item xs={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox checked={writ} onClick={(e)=>{setWrit((e.target as HTMLInputElement).checked)}}/>} label="WRIT" />
                    <FormControlLabel control={<Checkbox checked={rpp} onClick={(e)=>{setRPP((e.target as HTMLInputElement).checked)}}/>} label="RPP" />
                    <FormControlLabel control={<Checkbox checked={remote} onClick={(e)=>{setRemote((e.target as HTMLInputElement).checked)}}/>} label="Remote" />
                    <FormControlLabel control={<Checkbox checked={premodern} onClick={(e)=>{setPremodern((e.target as HTMLInputElement).checked)}}/>} label="Premodern" />
                    <FormControlLabel control={<Checkbox checked={cblr} onClick={(e)=>{setCBLR((e.target as HTMLInputElement).checked)}}/>} label="CBLR" />
                </FormGroup>
              </Grid>}
              {isUndergrad == 1 &&<Grid item xs={3}></Grid>}

              <Grid item xs={2}>
                <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Further Notes </Typography>
                </Grid>
                <Grid item xs={10}>
                <TextField
                fullWidth
                value={notes}
                  multiline={true}
                  rows={3}
                  onChange={(e)=>setNotes(e.target.value)}
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
                  onChange={(e)=>setSyllabusLink(e.target.value)}
                />
                <Typography variant="body2" mx="auto"> If you are regular faculty teaching for the first time, please add a syllabus link. </Typography>
                <Typography variant="body2" mx="auto">* are required fields </Typography>
              </Grid> 
              
            <Grid item marginX="auto" marginBottom={2}>
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                onClick={async () => {
                  let profMap = new Map<string, string>();
                  professorValues?.map((prof)=>{
                    profMap.set(prof.displayName!,prof._id!)
                  })
      

                  if (courseNumber === "" || courseTitle === "" || description==="" || year===0 || professors.length == 0){
                    alert("Please fill all required fields")
                  } else if (isNaN(year)){ 
                    alert("Year has to be a numerical value")
                  } else if (time1===time2 || time2 === time3 || time1===time3){
                    alert("Please enter different times for Time Ranking")
                  } else {
                    if (isUndergrad == 1) {
                      var profId: string[] = []
                      professors.map((prof)=>{
                        profId.push(profMap.get(prof)!)
                      })
                      var undergrad = isUndergrad === 1
                      var course1 = {
                        proposed: {
                          on_leave_fall: leaveFall,
                          on_leave_spring: leaveSpring,
                          is_regular_prof: isRegular,
                          course_title: courseTitle,
                          description: description,
                          professors: profId,
                          syllabus_link: syllabusLink,
                          is_undergrad: undergrad,
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
                          further_notes: notes
                        }
                      };
                      if (myState===null){
                        console.log(course1)
                        const success = await submitCourse(course1);
                        if (success){
                          alert("Course successfully submitted!")
                          navigate('/my_courses');
                        } else {
                          alert("Error submitting course")
                        }
                    } else if (edit){
                      alert("edit course")
                    } else if (existing){
                      alert("existing course")
                    }

                    } else {
                      var profId: string[] = []
                      professors.map((prof)=>{
                        profId.push(profMap.get(prof)!)
                      })
                      var undergrad = isUndergrad === 0
                      var course2 = {
                        proposed: {
                          course_number: `HIST ${courseNumber}`,
                          course_title: courseTitle,
                          description: description,
                          professors: profId,
                          is_undergrad: undergrad,
                          semester: semester,
                          year: year,
                          time_ranking: [time1, time2, time3],
                        }
                      };

                        if (myState===null){
                          console.log(course2)
                          const success = await submitCourse(course2);
                          if (success){
                            alert("Course successfully submitted!")
                            navigate('/my_courses');
                          }else{
                            alert("Error submitting course")
                          }
                      } else if (edit){
                        alert("edit course")
                      } else if (existing){
                        alert("existing course")
                      }
                    }
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
