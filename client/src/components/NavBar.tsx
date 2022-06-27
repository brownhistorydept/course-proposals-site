import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Profile from './Profile'
import { IUser } from '../../../server/src/models/User';

export default function NavBar(props: {
  user: IUser | undefined;
}) {
  return (
    <AppBar position="static" style={{ background: '#992525' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 50,
              width: 40,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              marginRight: 2,
            }}
            alt="brown icon"
            src="https://www.logolynx.com/images/logolynx/s_6a/6a11e8656b9479ce79f736dc17078b7e.png"
          />

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Department of History Course Proposals
          </Typography>

          {props.user && (
            <Box sx={{ justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                key='Course Catalog'
                sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, textTransform: 'none' }}
                href="/course_catalog"
              >
                Course Catalog
              </Button>

              {props.user?.role !== "default" && props.user?.role !== "manager" &&
                <Button
                  key='My Courses'
                  sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, textTransform: 'none' }}
                  href="/my_courses"
                >
                  My Courses
                </Button>
              }

              {props.user?.role !== "default" &&
                <Button
                  key='Course Proposal'
                  sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, textTransform: 'none' }}
                  href="/course_proposal"
                >
                  Course Proposal
                </Button>}

              {props.user.role !== "default" && props.user?.role !== "professor" &&
                <Button
                  key='Review Courses'
                  sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, textTransform: 'none' }}
                  href="/review_courses"
                >
                  Review Courses
                </Button>}

              {props.user.role === "manager" &&
                <Button
                  key='Manage Roles'
                  sx={{ my: 2, color: 'white', display: 'block', marginRight: 3, textTransform: 'none' }}
                  href="/manage_roles"
                >
                  Manage Roles
                </Button>}

              <Profile user={props.user} />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
