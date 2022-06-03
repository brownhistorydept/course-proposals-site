import GoogleButton from 'react-google-button'
import React, { useEffect, useState } from "react";
import { IUser } from '../../../server/src/models/User';
import { setAuthenticatedUser } from '../utils/auth';

function Auth() {

  const [user, setUser] = useState<IUser>();

  // called once when components on page have rendered
  useEffect(() => {
      async function getUser() {
          await setAuthenticatedUser(setUser);
      }
      getUser();
  }, []);

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
