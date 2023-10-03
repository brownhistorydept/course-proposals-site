import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from "./components/CourseCard";
import InputLabel from "@mui/material/InputLabel";
import { useSearchParams } from "react-router-dom";
import Stack from "@mui/material/Stack";

import {
  Checkbox,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();

  const queryParameters = new URLSearchParams(window.location.search);

  const [user, setUser] = useState<IUser>();
  const [submittedCourses, setSubmittedCourses] = useState<ICourse[]>();

  const [years, setYears] = useState<string[]>(queryParameters.getAll("years"));
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const [sems, setSems] = useState<string[]>(queryParameters.getAll("sems"));
  const [semOptions, setSemOptions] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  useEffect(() => {
    let isMounted = true;
    var params = {};
    if (typeof user === "undefined") {
      return;
    }
    async function getCourses() {
      params = { professors: user?._id };
      await fetchCourses(setSubmittedCourses, params, false, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (
      typeof user === "undefined" ||
      typeof submittedCourses === "undefined"
    ) {
      return;
    }
    getYearSems();
  }, [user, submittedCourses]);

  function getYearSems() {
    const allCourses = submittedCourses ?? [];
    const sortedCourses = allCourses.sort((c1, c2) => {
      const semesters = ["Fall", "Summer", "Spring", "Winter"];
      if (c1.year > c2.year) {
        return -1;
      } else if (c1.year < c2.year) {
        return 1;
      } else {
        return semesters.indexOf(c1.semester) - semesters.indexOf(c2.semester);
      }
    });

    const currentYearOptions = [
      ...new Set(sortedCourses.map((course) => `${course.year}`)),
    ];

    const currentSemOptions = [
      ...new Set(sortedCourses.map((course) => `${course.semester}`)),
    ];

    setSems(
      queryParameters
        .getAll("sems")
        .filter((sem) => currentSemOptions.includes(sem))
    );

    setYears(
      queryParameters
        .getAll("years")
        .filter((year) => currentYearOptions.includes(year))
    );

    setSemOptions(currentSemOptions);
    setYearOptions(currentYearOptions);
  }

  if (user?.role === "default" || user?.role === "manager") {
    navigate("/course_catalog");
  }

  return (
    <div className="MyCourses">
      <NavBar user={user} />
      <Box
        sx={{
          margin: "auto",
          marginTop: 4,
          maxWidth: 1060,
          paddingLeft: 0,
          border: 0,
        }}
      >
        <br />
        <Box sx={{ width: 500, margin: 0, paddingLeft: 2 }}>
          <Typography variant="h2" paddingBottom={5}>
            My Courses
          </Typography>
          <Grid item xs={8} paddingBottom="30px">
            <Stack direction="row" spacing={2}>
              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    m: 0,
                    margin: 0,
                    height: 1,
                    border: 0,
                    padding: 0,
                    fontSize: 16,
                  }}
                >
                  Semester
                </InputLabel>
                <Select
                  size="small"
                  multiple
                  value={sems}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setSems(
                      typeof value === "string" ? value.split(",") : value
                    );
                    setSearchParams({
                      years: years,
                      sems:
                        typeof value === "string" ? value.split(",") : value,
                    });
                  }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {semOptions.map((pair, index) => (
                    <MenuItem key={index} value={pair}>
                      <Checkbox checked={sems.indexOf(pair) > -1} />
                      <ListItemText primary={pair} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel
                  sx={{
                    m: 0,
                    margin: 0,
                    height: 1,
                    border: 0,
                    padding: 0,
                    fontSize: 16,
                  }}
                >
                  Year
                </InputLabel>
                <Select
                  size="small"
                  multiple
                  value={years}
                  onChange={(event) => {
                    const {
                      target: { value },
                    } = event;
                    setYears(
                      typeof value === "string" ? value.split(",") : value
                    );

                    setSearchParams({
                      sems: sems,
                      years:
                        typeof value === "string" ? value.split(",") : value,
                    });
                  }}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {yearOptions.map((pair, index) => (
                    <MenuItem key={index} value={pair}>
                      <Checkbox checked={years.indexOf(pair) > -1} />
                      <ListItemText primary={pair} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Grid>
        </Box>

        <Box sx={{ paddingLeft: 2, paddingBottom: "30px" }}>
          <Typography variant="body2" my={"8px"} mx="auto">
            To see Accepted by CCC courses, please see the Course Catalog.
          </Typography>
          <Typography
            variant="h4"
            color="#992525"
            fontWeight={500}
            marginBottom={3}
            paddingTop="30px"
          >
            Submitted
          </Typography>

          {submittedCourses?.map(
            (course, index) =>
              (years.length > 0 && sems.length > 0
                ? years?.some(
                    (year) => year.indexOf(String(course.year)) > -1
                  ) && sems?.some((sem) => sem.indexOf(course.semester) > -1)
                : years?.some(
                    (year) => year.indexOf(String(course.year)) > -1
                  ) ||
                  sems?.some((sem) => sem.indexOf(course.semester) > -1)) &&
              !course.withdrawn && (
                <CourseCard
                  key={index}
                  course={course}
                  status={true}
                  canEdit={
                    course.proposal_status !== "accepted by director" ||
                    user?.role !== "professor"
                  }
                  canAccept={false}
                  canNewProposal={false}
                  isRestrictedView={
                    user?.role === "professor" &&
                    course.proposal_status === "accepted by CCC"
                  }
                  selectedSems={searchParams}
                />
              )
          )}

          <Typography variant="h4" color="#992525" fontWeight={500} marginY={3}>
            Withdrawn Courses
          </Typography>

          {submittedCourses?.map(
            (course, index) =>
              (years.length > 0 && sems.length > 0
                ? years?.some(
                    (year) => year.indexOf(String(course.year)) > -1
                  ) && sems?.some((sem) => sem.indexOf(course.semester) > -1)
                : years?.some(
                    (year) => year.indexOf(String(course.year)) > -1
                  ) ||
                  sems?.some((sem) => sem.indexOf(course.semester) > -1)) &&
              course.withdrawn && (
                <CourseCard
                  key={index}
                  course={course}
                  status={true}
                  canEdit={
                    course.proposal_status !== "accepted by director" ||
                    user?.role !== "professor"
                  }
                  canAccept={false}
                  canNewProposal={false}
                  isRestrictedView={
                    user?.role === "professor" &&
                    course.proposal_status === "accepted by CCC"
                  }
                  selectedSems={searchParams}
                />
              )
          )}
        </Box>
      </Box>
    </div>
  );
}

export default MyCourses;
