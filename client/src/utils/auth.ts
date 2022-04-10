import { IUser } from '../../../server/src/models/User';

// fetches the user if the user is logged in on the backend

export async function fetchUser(
    setUser: (user: IUser) => void,
    setError: (error: string) => void
  ) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/auth/login/success`,
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
            setUser(resJson.user);
        } else {
            throw new Error("Failed to authenticate user");
        }
    } catch (error) {
        setError("Failed to authenticate user");
    }
  } 