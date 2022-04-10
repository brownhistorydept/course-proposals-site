import "./App.css";
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Auth from "./components/Auth"
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import { fetchCourses } from "./utils/courses";
import { fetchProfessors } from "./utils/professors";
import { ICourse } from "../../server/src/models/Course";
import CourseInfo from './components/CourseInfo'
import Search from './components/Search';

// const courses = [
//   {course_number: "HIST 0250", 
//       course_title: "American Exceptionalism: The History of an Idea", 
//       professors: [{displayName: "Michael Vorenberg"}],
//       crn: 24823,
//       semester: "Spring",
//       year: 2021,
//       is_DIAP: true,
//       is_WRIT: true,
//       is_Premodern: true,
//       geography: "North America",
//       is_remote: true,
//       is_undergrad: true,
//       is_intro: true,
//   },
//   {course_number: "HIST 0150D", 
//       course_title: "Refugees: A Twentieth-Century History",
//       professors: [{displayName: "Vazira F-Y Zamindar"}],
//       crn: 12312,
//       semester: "Fall",
//       year: 2022,
//       is_DIAP: false,
//       is_WRIT: true,
//       is_Premodern: false,
//       geography: "Europe",
//       is_remote: true,
//       is_undergrad: false,
//       is_intro: true,
//   },
//   {course_number: "HIST 0150G", 
//       course_title: "History of Law: Great Trials", 
//       professors: [{displayName: "Holly A Case"}],
//       crn: 32321,
//       semester: "Spring",
//       year: 2022,
//       is_DIAP: false,
//       is_WRIT: false,
//       is_Premodern: false,
//       geography: "MESA",
//       is_remote: true,
//       is_undergrad: true,
//       is_intro: true,
//   }
// ]


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

    const [courses, setCourses] = useState<ICourse[]>();
      // called once when components on page have rendered
      useEffect(() => {
          async function getCourses() {
              await fetchCourses(setCourses, setError, null, true);
          }
          getCourses();
      }, []);

  const [professors, setProfessors] = useState<IUser[]>();
      // called once when components on page have rendered
      useEffect(() => {
          async function getProfessors() {
              await fetchProfessors(setProfessors, setError);
          }
          getProfessors();
      }, []);
 
  return(
  user?
    <div className="CoursePage">
      <NavBar user={user} />
      <Search professor={professors} courses={courses}/>
      {console.log(courses)}
      {/* {console.log(user)} */}
      {console.log("Professors:" + professors)}
      {console.log("hi")}

      {/* {courses?.map((course, index) => (
            <CourseInfo course={course} status={false}/>
        ))} */}

    </div>
    
    
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
