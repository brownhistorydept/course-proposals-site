import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseInfo from './components/CourseInfo';


function CourseApproval() {

  const [user, setUser] = useState<IUser>();
  const [courses, setCourses] = useState<ICourse[]>();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
          await fetchUser(setUser, setError);
        }

        getUser(); 
    }, []);

    useEffect(() => {
      var params = {}; 
        async function getCourses() {
            params = {proposal_status: "under review by director"}
            await fetchCourses(setCourses, setError, params);
          
        }
        getCourses(); 
      
    }, [user]);


  return (
    <div className="CourseApproval">

      <NavBar user = {user}/>
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
          }}>
        <br/>
        <Box sx={{width: 500,  margin: 0, paddingLeft: 2,}}> 
            <Typography variant="h3" paddingBottom={5}>
                Approve Courses
            </Typography>


            {/* <Typography variant="h5" color="#992525" fontWeight={500} marginBottom={3}>
                Approved
            </Typography> */}
            {typeof(courses)=="undefined" && <Typography variant="body1"> No courses found </Typography>} 
            </Box>
            {courses?.map((course, index) => (
              <CourseInfo course={course} status={true} edit={false} approve={true}/> 
            ))}

         
      </Box>

    </div>
  );
}

export default CourseApproval;
