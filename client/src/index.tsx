import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import CourseCatalog from './CourseCatalog'
import MyCourses from './MyCourses';
import CourseProposal from './CourseProposal';
import CourseReview from './CourseReview';
import CourseView from './CourseView'
import ManageRoles from './ManageRoles'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/course_catalog" element={<CourseCatalog />} />
      <Route path="/my_courses" element={<MyCourses />} />
      <Route path="/course_proposal" element={<CourseProposal />} />
      <Route path="/review_courses" element={<CourseReview />} />
      <Route path="/view_course" element={<CourseView />} />
      <Route path="/manage_roles" element={<ManageRoles />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
