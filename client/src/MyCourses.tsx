import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from './components/CourseCard';

function MyCourses() {
  const [user, setUser] = useState<IUser>();
  const [approvedCourses, setApprovedCourses] = useState<ICourse[]>();
  const [pendingCourses, setPendingCourses] = useState<ICourse[]>();
  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  useEffect(() => {
    var params = {};
    if (typeof user === "undefined") {
      return;
    }
    async function getCourses() {
      params = { professors: user?._id };
      console.log(params);
      await fetchCourses(setApprovedCourses, params, true);
      await fetchCourses(setPendingCourses, params, false);

    }
    getCourses();
  }, [user]);
  // I added [user] so that useEffect gets called every time user changes
  // this means that it it'll return if user is undefined, and once user is set it'll get called once (and only once) to set the user. 
  // https://linguinecode.com/post/why-react-setstate-usestate-does-not-update-immediately

  return (
    <div className="MyCourses">

      <NavBar user={user} />
      <Box sx={{
        margin: 'auto', marginTop: 4, maxWidth: 1060, paddingLeft: 0, border: 0
      }}>
        <br />
        <Box sx={{ width: 500, margin: 0, paddingLeft: 2, }}>
          <Typography variant="h2" paddingBottom={5}>
            My Courses
          </Typography>


          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3}>
            Approved
          </Typography>
          {typeof (approvedCourses) == "undefined" && <Typography variant="body1"> No courses found </Typography>}
        </Box>
        {approvedCourses?.map((course, index) => (
          <CourseCard key={index} course={course} status={false} edit={false} approve={false} new_proposal={false} />
        ))}


        <Box sx={{ width: 500, margin: 0, paddingLeft: 2, }}>
          <Typography variant="h4" color="#992525" fontWeight={500} marginBottom={3} marginTop={5}>
            Submitted
          </Typography>
          {typeof (pendingCourses) == "undefined" && <Typography variant="body1"> No courses found </Typography>}
        </Box>
        {pendingCourses?.map((course, index) => (
          <CourseCard key={index} course={course} status={true} edit={true} approve={false} new_proposal={false} />
        ))}

      </Box>

    </div>
  );
}

export default MyCourses;
