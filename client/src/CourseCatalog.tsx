import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUsers } from "./utils/users";
import { fetchCourses } from "./utils/courses";
import { ICourse } from "../../server/src/models/Course";
import Search from './components/Search';
import { setAuthenticatedUser } from './utils/auth';


export default function CourseCatalog() {

  const [user, setUser] = useState<IUser>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await setAuthenticatedUser(setUser);
        }
        getUser();
    }, []);

    const [courses, setCourses] = useState<ICourse[]>();
      // called once when components on page have rendered
      useEffect(() => {
          async function getCourses() {
              await fetchCourses(setCourses, null, true);
          }
          getCourses();
      }, []);

  const [professors, setProfessors] = useState<IUser[]>();
      // called once when components on page have rendered
      useEffect(() => {
          async function getProfessors() {
              await fetchUsers(setProfessors, true);
          }
          getProfessors();
      }, []);

      return (

        <div>
            <NavBar user={user} />
            {typeof user !== "undefined" && typeof professors !== "undefined" && typeof courses !== "undefined" 
                && <Search allProfessors={professors} courses={courses} user={user}/>}
        </div>
      )


}
