import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
import CoursePage from './CoursePage';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/courses" element={<CoursePage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);
