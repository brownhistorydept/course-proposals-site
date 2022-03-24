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
  const [crn, setCrn] = useState(0);
  const [isUndergrad, setIsUndergrad] = useState(1);
  const [geography, setGeography] = useState('');
  const [description, setDescription] = useState('');
  const [capstone, setCapstone] = useState(false);

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
              <Grid item xs={10}>
              <TextField
                size='small'
                defaultValue="HIST "
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

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>CRN</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                size='small'
                onChange={(e)=>setCrn(parseInt(e.target.value))}
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
                  <FormControlLabel control={<Checkbox />} label="First-Year Seminar" />
                  <FormControlLabel control={<Checkbox />} label="Sophomore Seminar" />
                  <FormControlLabel control={<Checkbox />} label="Intro" />
                  <FormControlLabel control={<Checkbox />} label="Lecture" />
                </FormGroup>
              </Grid>
              <Grid item xs={3}>
                <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="WRIT" />
                    <FormControlLabel control={<Checkbox />} label="DIAP" />
                    <FormControlLabel control={<Checkbox />} label="Remote" />
                    <FormControlLabel control={<Checkbox />} label="Premodern" />
                </FormGroup>
              </Grid>
              <Grid item xs={3}></Grid>
              
              
            <Grid item marginX="auto" >
              <Button 
                variant="contained" 
                sx={{textTransform:"none", backgroundColor:"#992525", mx:1}}
                onClick={() => {
                  console.log(`no ${courseNumber}`)
                  console.log(`title ${courseTitle}`)
                  console.log(`crn ${crn}`)
                  console.log(`is_undergrad ${isUndergrad}`)
                  console.log(`geog ${geography}`)
                  console.log(`desc ${description}`)
                  console.log(`capstone ${capstone}`)
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
