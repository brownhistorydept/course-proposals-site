import { IUser } from '../../../server/src/models/User';

// fetches the user if the user is logged in on the backend

export async function fetchProfessors(
    setProfessors: (user: IUser[]) => void,
    setError: (error: string) => void
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
            console.log(resJson)
            // setUser(resJson.user);
        } else {
            throw new Error("failed to authenticate user");
        }
    } catch (error) {
        setError("Failed to authenticate user");
    }
  } 