import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseInfo from './components/CourseInfo';


function MyCourses() {

  const [user, setUser] = useState<IUser>();
  const [approvedCourses, setApprovedCourses] = useState<ICourse[]>();
  const [pendingCourses, setPendingCourses] = useState<ICourse[]>();
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
            params = {professors: user?._id ,proposal_status: "accepted by CCC",  };
            await fetchCourses(setApprovedCourses, setError, params);
            // params = {professors: user?._id ,proposal_status: {$ne:"accepted by CCC"},  }
            params = {professors: user?._id ,proposal_status: {$ne:"accepted by CCC"},  }
            await fetchCourses(setPendingCourses, setError, params);
          
        }
        getCourses(); 
      
    }, [user]);


  return (
    <div className="MyCourses">

      <NavBar user = {user}/>
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
          }}>
        <br/>
        <Box sx={{width: 500,  margin: 0, paddingLeft: 2,}}> 
            <Typography variant="h3" paddingBottom={5}>
                My Courses
            </Typography>


            <Typography variant="h5" color="#992525" fontWeight={500} marginBottom={3}>
                Approved
            </Typography>
            {typeof(approvedCourses)=="undefined" && <Typography variant="body1"> No courses found </Typography>} 
            </Box>
            {approvedCourses?.map((course, index) => (
              <CourseInfo course={course} status={false} edit={true} approve={false}/> 
            ))}


          <Box sx={{width: 500, margin: 0, paddingLeft: 2,}}> 
           <Typography variant="h5" color="#992525" fontWeight={500} marginBottom={3} marginTop={5}>
              Submitted
          </Typography>
          {typeof(pendingCourses)=="undefined" && <Typography variant="body1"> No courses found </Typography>} 
          </Box>
          {pendingCourses?.map((course, index) => (
            <CourseInfo course={course} status={true} edit={true} approve={false}/> 
          ))}
         
      </Box>

    </div>
  );
}

export default MyCourses;
