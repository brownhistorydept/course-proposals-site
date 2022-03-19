import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import MyCourses from './MyCourses';
import CourseProposal from './CourseProposal';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/my_courses" element={<MyCourses />} />
      <Route path="/course_proposal" element={<CourseProposal />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
