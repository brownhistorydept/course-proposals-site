import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import NavBar from './components/NavBar';
import CourseProposal from './components/CourseProposal';

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/auth/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <NavBar/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header> */}
      {/* <CourseProposal/> */}
    </div>
  );
}

export default App;