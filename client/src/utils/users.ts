import { IUser } from '../../../server/src/models/User';

// fetches the user if the user is logged in on the backend

export async function fetchUsers(
    setUser: (user: IUser[]) => void,
    justProfessors: boolean
    ) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/users/${justProfessors ? 'professors' : 'all'}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
            }
        );
        
        if (res.status === 200) {
            const resJson = await res.json();
            setUser(resJson.results);
        } else {
            throw new Error("Failed to fetch users");
        }
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}

export async function changeRole(user: IUser, newRole: string) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/users/change-role/${user._id}`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify({role: newRole}),
            }
        );
        
        if (res.status === 200) {
            const resJson = await res.json();
            return resJson.results;
        } else {
            throw new Error("Failed to fetch users");
        }
    } catch (error) {
        throw new Error("Failed to fetch users");
    }
}

