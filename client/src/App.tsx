import "./App.css";
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { handleLoginClick, setAuthenticatedUser } from "./utils/auth";
import { useNavigate } from 'react-router-dom';
import GoogleButton from "react-google-button";

function App() {
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser>();
  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  return (
    (user) ?
      <div><NavBar user={user} />
        {navigate('./course_catalog')}</div>

      : <div className="App">
        <NavBar user={user} />
        <Box
          sx={{
            width: 500,
            height: 300,
            margin: 'auto',
          }}
        >
          <Typography
            variant="h3"
            align="left"
            mt={10}
          >
            Welcome!
          </Typography>

          <Typography
            variant="h5"
            align="left"
            marginTop="50px"
            marginBottom="20px"
          >
            To submit or review History course proposals, log in with your Brown email.
          </Typography>

          <GoogleButton onClick={handleLoginClick} />
        </Box>
      </div>
  )
}

export default App;
