import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import MyCourses from './MyCourses';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/my_courses" element={<MyCourses />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
