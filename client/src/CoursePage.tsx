import NavBar from './components/NavBar';
import CourseInfo from './components/CourseInfo'
import FilterDropdown from './components/FilterDropdown';
import CourseProposal from './components/CourseProposal';

const courses = [
  {course_number: "0250", course_title: "American Exceptionalism: The History of an Idea", professor: "Michael Vorenberg"},
  {course_number: "0150D", course_title: "Refugees: A Twentieth-Century History", professor: "Vazira F-Y Zamindar"},
  {course_number: "0150G", course_title: "History of Law: Great Trials", professor: "Holly A Case"}
]

function CoursePage() {
  return (
    <div className="CoursePage">
      <NavBar/>
      <CourseProposal/>
      {courses.map((course, index) => (
            <CourseInfo course_number={course.course_number}
                        course_title={course.course_title}
                        professor={course.professor}/>
        ))}

    </div>
  );
}

export default CoursePage;
