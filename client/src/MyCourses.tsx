import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";

function MyCourses() {

  const [user, setUser] = useState<IUser>();
  const [, setError] = useState("");
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser, setError);
        }
        getUser();
    }, []);

  return (
    <div className="MyCourses">
      {/* need to pass the user to NavBar, which passes it to Profile */}
      <NavBar user = {user}/>
      <h1>Hello World!</h1>

    </div>
  );
}

export default MyCourses;
