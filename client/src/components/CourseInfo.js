import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createMuiTheme } from '@material-ui/core/styles'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid({course}) {
  return (
    <Paper
      sx={{
        p: 2,
        mx: 'auto',
        my: 2,
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: "#ededed",
      }}

    >
      <Grid container spacing={3}>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" py={0.5} px={3} >

            {/* First row */}
            <Grid item xs container >
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1" sx={{fontWeight: 'bold'}}>{course.course_number}</Typography>
              </Grid>
              <Grid item xs container >
                <Typography variant="body1" gutterBottom>{course.course_title}</Typography>
              </Grid>
             </Grid>

            {/* Second row */}
             <Grid item xs container >
              <Grid item xs={3.5} container >
                <Typography gutterBottom variant="body1">{course.professors[0].displayName}</Typography>
              </Grid>  
              <Grid item xs={2.5} container >
                <Typography gutterBottom variant="body1">{course.semester} {course.year}</Typography>
              </Grid>
              <Grid item xs={3} container >
              <Typography gutterBottom variant="body1">CRN {course.crn}</Typography>
              </Grid>
              <Grid item xs={3} container >
              <Typography gutterBottom variant="body1" sx={{pr:8}}>{course.is_undergrad?"Undergrad":"Grad"}</Typography>
              </Grid>  
            </Grid>


            {/* third row */}
            <Grid item xs container >
              <Grid item xs container >
                {/* <Typography gutterBottom variant="body1">{course.is_DIAP?"DIAP | ":""}
                                                         {course.is_WRIT?"WRIT | ":""} 
                                                         {course.is_Premodern?"Premodern | ":""} 
                                                         {course.is_intro?"Intro | ":""}
                                                         {course.is_remote?"REM | ":""}</Typography> */}
                <FormGroup row>
                  {course.is_DIAP && <FormControlLabel disabled checked control={<Checkbox />} label="DIAP" />}
                  {!course.is_DIAP && <FormControlLabel disabled control={<Checkbox />} label="DIAP" />}

                  {course.is_WRIT && <FormControlLabel disabled checked control={<Checkbox />} label="WRIT" />}
                  {!course.is_WRIT && <FormControlLabel disabled control={<Checkbox />} label="WRIT" />}

                  {course.is_remote && <FormControlLabel disabled checked control={<Checkbox />} label="REM" />}
                  {!course.is_remote && <FormControlLabel disabled control={<Checkbox />} label="REM" />}

                  {course.is_premodern && <FormControlLabel disabled checked control={<Checkbox />} label="P" />}
                  {!course.is_premodern && <FormControlLabel disabled control={<Checkbox />} label="P" />}

                  {course.is_intro && <FormControlLabel disabled checked control={<Checkbox />} label="Intro" />}
                  {!course.is_intro && <FormControlLabel disabled control={<Checkbox />} label="Intro" />}
                </FormGroup>
              </Grid>  
            </Grid>

          </Grid>
        </Grid>

        <Grid item align="center" justify="center" my={2} mr={10}>
          <Button variant="contained" sx={{textTransform:"none", backgroundColor:"#992525"}}>
              <Typography gutterBottom variant="body1">
                New Proposal
              </Typography>
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
