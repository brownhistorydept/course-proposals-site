import "./App.css";
import NavBar from './components/NavBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Auth from "./components/Auth"
import { useState } from "react";
import { IUser } from "./types";

// async function checkAuth() {
//   try {
//       const res = await fetch(
//           `${process.env.REACT_APP_SERVER_URL}/auth/check-auth`,
//           {
//               method: "GET",
//               credentials: "include",
//               headers: {
//                   Accept: "application/json",
//                   "Content-Type": "application/json",
//                   "Access-Control-Allow-Credentials": "true",
//               },
//           }
//       );
//
//       if (res.status === 200) {
//           const resJson = await res.json();
//           // console.log(resJson.user);
//           return {isAuth: true, user: resJson.user};
//       } else {
//           throw new Error("user is not authenticated");
//       }
//   } catch (error) {
//       // console.error(error);
//       return {isAuth: false, user:null}
//   }
// }

function App() {
  // let isAuth = false;
  // let user;
  // checkAuth().then((x) => {
  //   isAuth = x.isAuth;
  //   user = x.user;
  // });

  if (true) {
    return (
      <div className="App">
        <NavBar/>
          <Box
              sx={{
              width: 500,
              height: 300,
              margin: 'auto',
            }}
            >
            <Typography
                  variant="h3"
                  align ="left"
                  mt={10}
                >
                  Welcome!
            </Typography>

            <Typography
              variant="h5"
              align ="left"
              marginTop="50px"
              marginBottom="20px"
              >
              To submit or review History course proposals, log in with your Brown email.
            </Typography>

            <Auth/>

          </Box>
    </div>
)} else {
    return(
        <div><h1>Hi</h1></div>
    );

}

}

export default App;
