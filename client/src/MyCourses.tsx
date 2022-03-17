import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import mongoose from 'mongoose';



function MyCourses() {

  const [user, setUser] = useState<IUser>();
  const [courses, setCourses] = useState<ICourse[]>();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
      var params = {};
        async function getUser() {
          await fetchUser(setUser, setError);
        }
        async function getCourses() {
            params = {professors: new mongoose.Types.ObjectId(user?._id)};
            // params = {professors: user?._id }
            await fetchCourses(setCourses, setError, params);
          
        }
        getUser().then(()=>
          getCourses()
        );
        
      
    }, []);


  return (
    <div className="MyCourses">

      <NavBar user = {user}/>
      <Box sx={{
            margin: 'auto', marginTop: 4, maxWidth:1060, paddingLeft: 0, border:0
          }}>
        <br/>
        <Box
            sx={{
            width: 500,
            height: 120,
            margin: 0,
            paddingLeft: 2,
          }}> 
            <Typography variant="h3">
                My Courses
            </Typography>
          </Box>
      </Box>

    </div>
  );
}

export default MyCourses;
