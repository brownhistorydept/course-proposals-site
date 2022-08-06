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
    let isMounted = true;
    async function getCourses() {
      await fetchCourses(setCourses, null, true, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false
    }
  }, []);

  const [professors, setProfessors] = useState<IUser[]>();
  // called once when components on page have rendered
  useEffect(() => {
    async function getProfessors() {
      await fetchUsers(setProfessors, true);
    }
    getProfessors();
  }, []);

  function sortProfessors() {
    professors?.sort((prof1, prof2) => {
      const prof1_surname = prof1.displayName.split(' ')[1]
      const prof2_surname = prof2.displayName.split(' ')[1]
      return prof1_surname.localeCompare(prof2_surname)
    }
    )
  }

  return (
    <div>
      <NavBar user={user} />
      {typeof professors !== "undefined" && sortProfessors()}
      {typeof user !== "undefined" && typeof professors !== "undefined" && typeof courses !== "undefined"
        && <Search allProfessors={professors} courses={courses} user={user} />}
    </div>
  );
}
