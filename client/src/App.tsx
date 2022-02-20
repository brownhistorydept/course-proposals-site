import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import NavBar from './components/NavBar';
import CourseProposal from './components/CourseProposal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CourseInfo from './components/CourseInfo'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


// const theme = createTheme({
//   typography: {
//     fontFamily: 'Roboto',
//   }});

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/auth/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      {/* <ThemeProvider theme={theme}> */}
      <NavBar/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header> */}
      {/* <CourseProposal/> */}
      {/* { <h1>Welcome!</h1> }
      { <h4>To submit or review History CourseProposal proposals, log in with your Brown email</h4>}     */}
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
            >
            To submit or review History course proposals, log in with your Brown email.
          </Typography>

        </Box>
        {/* </ThemeProvider> */}

        <CourseInfo/>


    </div>
  );
}

export default App;
