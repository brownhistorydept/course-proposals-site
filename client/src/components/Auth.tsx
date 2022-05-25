import GoogleButton from 'react-google-button'
import React, { useEffect, useState } from "react";
import { IUser } from '../../../server/src/models/User';
import { setAuthenticatedUser } from '../utils/auth';

function Auth() {

  const [user, setUser] = useState<IUser>();
  
  // const [loading, setLoading] = useState(true);

  // called once when components on page have rendered
  useEffect(() => {
      async function getUser() {
          await setAuthenticatedUser(setUser);
          // setLoading(false);
      }
      getUser();
  }, []);

  // checks if the user is authenticated (probably just going to be used for test purposes)
  async function checkAuth() {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/auth/check-auth`,
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
            console.log(resJson.user);
        } else {
            throw new Error("user is not authenticated");
        }
    } catch (error) {
        console.error(error);
    }
  }

  const handleLoginClick = () => {
    window.open(`${process.env.REACT_APP_SERVER_URL}/auth/google`, "_self");
  }
  return (
    <div>
      <GoogleButton onClick={handleLoginClick}/>
    </div>
  );
}

export default Auth;
