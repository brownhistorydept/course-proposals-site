import { IUser } from '../../../server/src/models/User';

// fetches the user if the user is logged in on the backend

export async function fetchProfessors(
    setProfessors: (user: IUser[]) => void,
  ) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/users/professors`,
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
        // if the user is logged in, set the user and authenticated flag
        if (res.status === 200) {
            const resJson = await res.json();
            // console.log(resJson)
            setProfessors(resJson.results)
            // setUser(resJson.user);
        } else {
            throw new Error("Failed to fetch professors");
        }
    } catch (error) {
        throw new Error("Failed to fetch professors");
    }
  } 