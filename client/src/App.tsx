import "./App.css";
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Auth from "./components/Auth"
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import { fetchCourses } from "./utils/courses";
import { fetchUsers } from "./utils/users";
import { ICourse } from "../../server/src/models/Course";
import Search from './components/Search';
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await setAuthenticatedUser(setUser);
        }
        getUser();
    }, []);

  //   const [courses, setCourses] = useState<ICourse[]>();
  //     // called once when components on page have rendered
  //     useEffect(() => {
  //         async function getCourses() {
  //             // const params = {finalized: true}
  //             await fetchCourses(setCourses, null, true);
  //         }
  //         getCourses();
  //     }, []);

  // const [professors, setProfessors] = useState<IUser[]>();
  //     // called once when components on page have rendered
  //     useEffect(() => {
  //         async function getProfessors() {
  //             await fetchUsers(setProfessors, true);
  //         }
  //         getProfessors();
  //     }, []);
 
  return(
    (user) ?
      <div><NavBar user={user} />
      {navigate('./course_catalog')}</div>
    
    :<div className="App">
      <NavBar user={user} />
          <Box
              sx={{
              width: 500,
              height: 300,
              margin: 'auto',
            }}
            >
            <Typography
                  variant="h3"
                  align ="left"
                  mt={10}
                >
                  Welcome!
            </Typography>

            <Typography
              variant="h5"
              align ="left"
              marginTop="50px"
              marginBottom="20px"
              >
              To submit or review History course proposals, log in with your Brown email.
            </Typography>

            <Auth/>

          </Box>
    </div>
  )

}

export default App;
