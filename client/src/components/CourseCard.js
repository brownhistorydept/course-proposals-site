import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';

export default function ComplexGrid({ course, status, canEdit, canAccept, canNewProposal, isRestrictedView}) {
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
          <Grid item xs={12} container direction="column" py={0.5} px={3} >
            {/* First row */}
            <Grid item xs container >
              
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1" sx={{ fontWeight: 'bold' }}>{course.course_number}</Typography>
              </Grid>
              <Grid item xs container >
                <Typography variant="body1" gutterBottom>{course.course_title}</Typography>
              </Grid>
            </Grid>

            {/* Second row */}
            <Grid item xs container >
              <Grid item xs={5} container >
                {course.professors.map((name, index) => {
                  if (index === course.professors.length - 1) {
                    return <Typography gutterBottom variant="body1" key={name.displayName}>{name.displayName}</Typography>
                  } else {
                    return <Typography gutterBottom variant="body1" key={name.displayName}>{name.displayName},&nbsp;</Typography>
                  }
                })}
              </Grid>
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1">{course.semester} {course.year}</Typography>
              </Grid>
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1">{course.final_time}</Typography>
              </Grid>
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1" sx={{ pr: 8 }}>{course.is_undergrad ? "Undergraduate" : "Graduate"}</Typography>
              </Grid>
            </Grid>

            {/* Third row */}
            <Grid item xs container >
              <Grid item xs container >
                <FormGroup row>
                  {course.is_RPP && <FormControlLabel disabled checked control={<Checkbox />} label="RPP" key="RPP" />}
                  {!course.is_RPP && <FormControlLabel disabled control={<Checkbox />} label="RPP" key="RPP1" />}

                  {course.is_WRIT && <FormControlLabel disabled checked control={<Checkbox />} label="WRIT" key="WRIT" />}
                  {!course.is_WRIT && <FormControlLabel disabled control={<Checkbox />} label="WRIT" key="WRIT1" />}

                  {course.is_CBLR && <FormControlLabel disabled checked control={<Checkbox />} label="CBLR" key="CBLR" />}
                  {!course.is_CBLR && <FormControlLabel disabled control={<Checkbox />} label="CBLR" key="CBLR1" />}

                  {course.is_remote && <FormControlLabel disabled checked control={<Checkbox />} label="REM" key="REM" />}
                  {!course.is_remote && <FormControlLabel disabled control={<Checkbox />} label="REM" key="REM1" />}

                  {course.is_Premodern && <FormControlLabel disabled checked control={<Checkbox />} label="Premodern" key="P" />}
                  {!course.is_Premodern && <FormControlLabel disabled control={<Checkbox />} label="Premodern" key="P1" />}

                  {course.is_intro && <FormControlLabel disabled checked control={<Checkbox />} label="Intro" key="Intro" />}
                  {!course.is_intro && <FormControlLabel disabled control={<Checkbox />} label="Intro" key="Intro1" />}

                  {course.is_FYS && <FormControlLabel disabled checked control={<Checkbox />} label="FYS" key="FYS" />}
                  {!course.is_FYS && <FormControlLabel disabled control={<Checkbox />} label="FYS" key="FYS1" />}

                  {course.is_SYS && <FormControlLabel disabled checked control={<Checkbox />} label="SYS" key="SYS" />}
                  {!course.is_SYS && <FormControlLabel disabled control={<Checkbox />} label="SYS" key="SYS1" />}

                  {course.is_capstone && <FormControlLabel disabled checked control={<Checkbox />} label="Capstone" key="Capstone" />}
                  {!course.is_capstone && <FormControlLabel disabled control={<Checkbox />} label="Capstone" key="Capstone1" />}

                  {course.is_lecture && <FormControlLabel disabled checked control={<Checkbox />} label="Lecture" key="Lecture" />}
                  {!course.is_lecture && <FormControlLabel disabled control={<Checkbox />} label="Lecture" key="Lecture1" />}
                </FormGroup>
              </Grid>
            </Grid>
            {!isRestrictedView && <>
            <Grid item xs container >
              <Grid item xs={5} container >
                {status && <Typography variant="body1" fontWeight="bold" gutterBottom>Proposal Status: &nbsp;</Typography>}
                {status && <Typography variant="body1" gutterBottom>{course.proposal_status} </Typography>}
              </Grid>

              <Grid item xs={5} container >
                {status && <Typography variant="body1" fontWeight="bold" gutterBottom>Course Status: &nbsp;</Typography>}
                {status && <Typography variant="body1" gutterBottom>{course.course_status} </Typography>}
              </Grid>
            </Grid>
            </>}
          </Grid>
        </Grid>
        
        <Grid item align="center" justify="center" my="auto" mr={2}>
          <Link style={{ textDecoration: 'none' }} to={"/view_course"} state={{ course: course, canEdit: canEdit, canAccept: canAccept, canNewProposal: canNewProposal, isRestrictedView: isRestrictedView}}>
            <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#992525" }}>
              <Typography
                gutterBottom
                variant="body1">
                View Course
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
}
