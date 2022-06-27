import { IUser } from '../../../server/src/models/User';

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
      throw new Error("Request to fetch users was unsuccessful");
    }
  } catch (error) {
    throw new Error("Could not make request to fetch users");
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
        body: JSON.stringify({ role: newRole }),
      }
    );

    if (res.status === 200) {
      const resJson = await res.json();
      return resJson.results;
    } else {
      throw new Error("Request to change role was unsuccessful");
    }
  } catch (error) {
    throw new Error("Could not make request to change role");
  }
}
