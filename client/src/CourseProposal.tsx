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
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Number</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                id="course_number"
                size='small'
                defaultValue="HIST "
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Title</Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                id="course_title"
                size='small'
                fullWidth
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
                id="crn"
                size='small'
              />
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Level</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                id="is_undergrad"
                size='small'
                autoWidth
                defaultValue={1}
              >
                <MenuItem value={1}>Undergraduate</MenuItem>
                <MenuItem value={0}>Graduate</MenuItem>
              </Select>
              </Grid>

              <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Region</Typography>
              </Grid>
              <Grid item xs={10}>
              <Select
                id="geography"
                size='small'
                autoWidth
                defaultValue={"Global"}
              >
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
              <Typography variant="body1" fontWeight="bold" my="auto" align='right'>Course Description </Typography>
              </Grid>
              <Grid item xs={10}>
              <TextField
                id="description"
                fullWidth
                multiline={true}
                rows={5}
              />
              </Grid>

              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <FormGroup>
                  <FormControlLabel control={<Checkbox />} label="Capstone" />
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
              
            <Grid item marginX="auto">
              <Button variant="contained" sx={{textTransform:"none", backgroundColor:"#992525"}}>
                  <Typography gutterBottom variant="body1">
                    Submit
                  </Typography>
              </Button>
            </Grid>

          </Grid>

      

    </div>
  );
}

export default CourseProposal;
