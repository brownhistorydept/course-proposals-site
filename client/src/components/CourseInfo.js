import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 1000,
        flexGrow: 1,
        backgroundColor: "#ededed",
      }}
    >
      <Grid container spacing={3}>

        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" py={0.5} px={3} >

            <Grid item xs container >
              <Typography gutterBottom variant="body1" sx={{fontWeight: 'bold', pr:2}}>
                HIST 0250
              </Typography>
              <Typography variant="body1" gutterBottom>
                American Exceptionalism: The History of an Idea
              </Typography>
             </Grid>

             <Grid item xs container >
               <Typography gutterBottom variant="body1" sx={{pr:8}}>
                 Michael Vorenberg
               </Typography>
               <Typography gutterBottom variant="body1" sx={{pr:8}}>
                 Spring 2022
               </Typography>
               <Typography gutterBottom variant="body1" sx={{pr:8}}>
                 CRN 24823
               </Typography>
               <Typography gutterBottom variant="body1" sx={{pr:8}}>
                 Undergrad
               </Typography>
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
