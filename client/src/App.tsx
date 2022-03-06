import "./App.css";
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Auth from "./components/Auth"
import React, { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import CourseInfo from './components/CourseInfo'
import FilterDropdown from './components/FilterDropdown';
import CourseProposal from './components/CourseProposal';

const courses = [
  {course_number: "0250", course_title: "American Exceptionalism: The History of an Idea", professor: "Michael Vorenberg"},
  {course_number: "0150D", course_title: "Refugees: A Twentieth-Century History", professor: "Vazira F-Y Zamindar"},
  {course_number: "0150G", course_title: "History of Law: Great Trials", professor: "Holly A Case"}
]


function App() {

  const [user, setUser] = useState<IUser>();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser, setError);
        }
        getUser();
    }, []);

 
    console.log(user?.displayName)
  return(
  user?
    <div className="CoursePage">
      <NavBar/>
      <CourseProposal/>
      {courses.map((course, index) => (
            <CourseInfo course_number={course.course_number}
                        course_title={course.course_title}
                        professor={course.professor}/>
        ))}

    </div>
    
    
    
    :<div className="App">
        <NavBar/>
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
