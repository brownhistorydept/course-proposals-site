import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link } from 'react-router-dom';

import { TIMES, TIME_STRINGS } from '../utils/constants';

export default function ComplexGrid({ course, status, canEdit, canAccept, canNewProposal, isRestrictedView }) {
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

              {course.course_number ?
                <Grid item xs={4} container >
                  <Typography gutterBottom variant="body1" sx={{ fontWeight: 'bold' }}>{course.course_number}</Typography>
                </Grid>
                : <></>}
              <Grid item xs={5} container>
                <Typography variant="body1" gutterBottom>{course.course_title}</Typography>
              </Grid>
              <Grid item xs={3} container>
                <Typography variant="body1" gutterBottom>{course.course_type}</Typography>
              </Grid>
            </Grid>

            {/* Second row */}
            <Grid item xs container >
              <Grid item xs={4} container >
                {course.professors.map((name, index) => {
                  if (index === course.professors.length - 1) {
                    return <Typography gutterBottom variant="body1" key={name.displayName}>{name.displayName}</Typography>
                  } else {
                    return <Typography gutterBottom variant="body1" key={name.displayName}>{name.displayName},&nbsp;</Typography>
                  }
                })}
              </Grid>
              <Grid item xs={3} container >
                <Typography gutterBottom variant="body1">{course.semester} {course.year}</Typography>
              </Grid>
              <Grid item xs={2} container >
                <Typography gutterBottom variant="body1">{TIMES.indexOf(course.final_time) === -1 ? course.final_time : TIME_STRINGS[TIMES.indexOf(course.final_time)]}</Typography>
              </Grid>
              <Grid item xs={3} container >
                <Typography gutterBottom variant="body1" sx={{ pr: 8 }}>{course.levels?.join(', ') ?? ''}</Typography>
              </Grid>
            </Grid>

            {/* Third row */}
            <Grid item xs container >
              <Grid item xs container >
                <FormGroup row>
                  <FormControlLabel control={<Checkbox disabled checked={course.is_WRIT} />} label="WRIT" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_RPP} />} label="RPP" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_premodern} />} label="Premodern" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_FYS} />} label="FYS" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_SOPH} />} label="SOPH" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_CBLR} />} label="CBLR" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_COEX} />} label="COEX" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_remote_only} />} label="Remote Only" />
                  <FormControlLabel control={<Checkbox disabled checked={course.is_remote_accessible} />} label="Remote Accessible" />
                </FormGroup>
              </Grid>
            </Grid>
            {
              !isRestrictedView && <>
                <Grid item xs container >
                  <Grid item xs={6} container >
                    {status && <Typography variant="body1" fontWeight="bold" gutterBottom>Proposal Status: &nbsp;</Typography>}
                    {status && <Typography variant="body1" gutterBottom>{course.proposal_status} </Typography>}
                  </Grid>

                  <Grid item xs={6} container >
                    {status && <Typography variant="body1" fontWeight="bold" gutterBottom>Course Status: &nbsp;</Typography>}
                    {status && <Typography variant="body1" gutterBottom>{course.course_status} </Typography>}
                  </Grid>
                </Grid>
              </>
            }
          </Grid >
        </Grid >

        <Grid item align="center" justify="center" my="auto" mr={2}>
          <Link style={{ textDecoration: 'none' }} to={"/view_course"} state={{ course: course, canEdit: canEdit, canAccept: canAccept, canNewProposal: canNewProposal, isRestrictedView: isRestrictedView }}>
            <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#992525" }}>
              <Typography
                gutterBottom
                variant="body1">
                View Course
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid >
    </Paper >
  );
}
