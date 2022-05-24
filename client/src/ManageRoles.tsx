import NavBar from './components/NavBar';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { fetchUser } from "./utils/auth";

function ManageRoles () {

    const [user, setUser] = useState<IUser>();
    // called once when components on page have rendered
    useEffect(() => {
        async function getUser() {
            await fetchUser(setUser);
        }
        getUser();
        
    }, []);

    return <NavBar user = {user}/>
}

export default ManageRoles