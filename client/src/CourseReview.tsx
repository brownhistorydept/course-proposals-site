import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { IUser } from "../../server/src/models/User";
import { setAuthenticatedUser } from "./utils/auth";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ICourse } from "../../server/src/models/Course";
import { fetchCourses } from "./utils/courses";
import CourseCard from "./components/CourseCard";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import Papa from "papaparse";
import { downloadFile } from "./utils/files";
import { useSearchParams } from "react-router-dom";

function CourseReview() {
  const queryParameters = new URLSearchParams(window.location.search);

  const [user, setUser] = useState<IUser>();
  const [underReviewCourses, setUnderReviewCourses] = useState<ICourse[]>();
  const [cccRejectedCourses, setCCCRejectedCourses] = useState<ICourse[]>();
  // const [cccAcceptedCourses, setCCCAcceptedCourses] = useState<ICourse[]>();
  const [directorRejectedCourses, setDirectorRejectedCourses] =
    useState<ICourse[]>();
  const [directorAcceptedCourses, setDirectorAcceptedCourses] =
    useState<ICourse[]>();
  const [withdrawnCourses, setWithdrawnCourses] = useState<ICourse[]>();

  const [alertTitle, setAlertTitle] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertPath, setAlertPath] = useState<string | undefined>();
  const navigate = useNavigate();

  const [years, setYears] = useState<string[]>(queryParameters.getAll("years"));
  const [yearOptions, setYearOptions] = useState<string[]>([]);

  const [sems, setSems] = useState<string[]>(queryParameters.getAll("sems"));
  const [semOptions, setSemOptions] = useState<string[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  // called once when components on page have rendered
  useEffect(() => {
    async function getUser() {
      await setAuthenticatedUser(setUser);
    }
    getUser();
  }, []);

  // get courses to review
  useEffect(() => {
    let isMounted = true;
    var params = {
      proposal_status: "under review by director",
      withdrawn: false,
    };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setUnderReviewCourses, params, false, isMounted);
      }
    }
    getCourses();

    return () => {
      isMounted = false;
    };
  }, [user]);

  // get CCC rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = {
      // proposal_status: "revisions requested by manager",
      rejected: true,
      withdrawn: false,
    };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }

    async function getCourses() {
      await fetchCourses(setCCCRejectedCourses, params, false, isMounted);
    }
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // // get CCC accepted courses
  // useEffect(() => {
  //   let isMounted = true;
  //   var params = { proposal_status: "accepted by CCC", withdrawn: false };
  //   if (user?.role === "undergraduate director") {
  //     params = Object.assign(params, { is_undergrad: true });
  //   } else if (user?.role === "graduate director") {
  //     params = Object.assign(params, { is_undergrad: false });
  //   }

  //   async function getCourses() {
  //     await fetchCourses(setCCCAcceptedCourses, params, false, isMounted);
  //   }
  //   getCourses();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [user]);

  // get director rejected courses
  useEffect(() => {
    let isMounted = true;
    var params = {
      proposal_status:
        "revisions requested by director" || "revisions requested by manager",
      withdrawn: false,
    };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }
    async function getCourses() {
      if (isMounted) {
        await fetchCourses(
          setDirectorRejectedCourses,
          params,
          false,
          isMounted
        );
      }
    }
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // get director accepted courses
  useEffect(() => {
    let isMounted = true;
    var params = { proposal_status: "accepted by director", withdrawn: false };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }
    async function getCourses() {
      if (isMounted) {
        await fetchCourses(
          setDirectorAcceptedCourses,
          params,
          false,
          isMounted
        );
      }
    }
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  // get withdrawn courses
  useEffect(() => {
    let isMounted = true;
    var params = { withdrawn: true };
    if (user?.role === "undergraduate director") {
      params = Object.assign(params, { is_undergrad: true });
    } else if (user?.role === "graduate director") {
      params = Object.assign(params, { is_undergrad: false });
    }
    async function getCourses() {
      if (isMounted) {
        await fetchCourses(setWithdrawnCourses, params, false, isMounted);
      }
    }
    getCourses();
    return () => {
      isMounted = false;
    };
  }, [user]);

  useEffect(() => {
    if (
      typeof user === "undefined" ||
      typeof underReviewCourses === "undefined" ||
      typeof directorAcceptedCourses == "undefined" ||
      typeof directorRejectedCourses == "undefined" ||
      typeof cccRejectedCourses === "undefined" ||
      // typeof cccAcceptedCourses === "undefined" ||
      typeof withdrawnCourses === "undefined"
    ) {
      return;
    }
    getYearSems();
  }, [
    user,
    underReviewCourses,
    directorAcceptedCourses,
    directorRejectedCourses,
    cccRejectedCourses,
    // cccAcceptedCourses,
    withdrawnCourses,
  ]);

  function getYearSems() {
    const allCourses = (underReviewCourses ?? []).concat(
      directorAcceptedCourses ?? [],
      directorRejectedCourses ?? [],
      cccRejectedCourses ?? [],
      // cccAcceptedCourses ?? [],
      withdrawnCourses ?? []
    );
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

    let currentYearOptions = [
      ...new Set(sortedCourses.map((course) => `${course.year}`)),
    ];

    let currentSemOptions = [
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

    currentYearOptions = currentYearOptions.filter(
      (opt) => opt !== "undefined"
    );
    currentSemOptions = currentSemOptions.filter((opt) => opt !== "undefined");

    setSemOptions(currentSemOptions);

    setYearOptions(currentYearOptions);
  }

  function filterByYearSem(
    courses?: ICourse[],
    withdraw = false
  ): ICourse[] | undefined {
    // return courses?.filter((course) =>
    //   yearSems?.some(
    //     (yearSem) =>
    //       yearSem.indexOf(String(course.year)) > -1 &&
    //       yearSem.indexOf(course.semester) > -1
    //   )
    if (withdraw) {
      return courses?.filter(
        (course, index) =>
          (years.length > 0 && sems.length > 0
            ? years?.some((year) => year.indexOf(String(course.year)) > -1) &&
              sems?.some((sem) => sem.indexOf(course.semester) > -1)
            : years?.some((year) => year.indexOf(String(course.year)) > -1) ||
              sems?.some((sem) => sem.indexOf(course.semester) > -1)) &&
          course.withdrawn
      );
    }
    return courses?.filter(
      (course, index) =>
        (years.length > 0 && sems.length > 0
          ? years?.some((year) => year.indexOf(String(course.year)) > -1) &&
            sems?.some((sem) => sem.indexOf(course.semester) > -1)
          : years?.some((year) => year.indexOf(String(course.year)) > -1) ||
            sems?.some((sem) => sem.indexOf(course.semester) > -1)) &&
        !course.withdrawn
    );
  }

  function curSemsToIdx() {
    return "";
  }

  if (user?.role === "default" || user?.role === "professor") {
    navigate("/course_catalog");
  }

  const openAlert = (title: string, path?: string) => {
    setAlertTitle(title);
    setAlertOpen(true);
    setAlertPath(path);
  };

  const onDownload = (showAllCourses: boolean) => {
    const coursesToShow = showAllCourses
      ? (filterByYearSem(underReviewCourses) ?? []).concat(
          filterByYearSem(directorAcceptedCourses) ?? [],
          filterByYearSem(directorRejectedCourses) ?? [],
          filterByYearSem(cccRejectedCourses) ?? []
          // filterByYearSem(cccAcceptedCourses) ?? []
        )
      : filterByYearSem(directorAcceptedCourses) ?? [];

    if (!coursesToShow || coursesToShow.length === 0) {
      openAlert("No courses to download", "/review_courses");
      return;
    }

    const rows = coursesToShow.map((course) => {
      var r = [
        course.on_leave_fall,
        course.on_leave_spring,
        course.is_regular_prof,
        course.prof_type,
        course.course_title,
        course.description,
        course.professors
          .map((professor) => (professor as unknown as IUser).displayName)
          .join(", "),
        course.syllabus_link,
        course.levels,
        course.is_RPP,
        course.is_WRIT,
        course.is_CBLR,
        course.is_FYS,
        course.is_SOPH,
        course.is_COEX,
        course.is_premodern,
        course.is_remote_accessible,
        course.is_remote_only,
        course.semester,
        course.year,
        course.geography?.join(", "),
        course.course_type,
        course.proposal_status,
        course.course_status,
        course.course_number,
        course.final_time,
        course.further_notes,
        course.transcript_title,
        course.times_cant_teach?.join(", "),
      ];
      if (course.time_ranking !== undefined) {
        course.time_ranking.length >= 1
          ? r.push(course.time_ranking[0])
          : r.push("");
        course.time_ranking.length >= 2
          ? r.push(course.time_ranking[1])
          : r.push("");
        course.time_ranking.length >= 3
          ? r.push(course.time_ranking[2])
          : r.push("");
      }

      // this includes everything from Course schema (as of 10/22/22) except comments
      return r;
    });

    const columns = [
      "Taking Fall Leave",
      "Taking Spring Leave",
      "Is Regular Professor?",
      "Professor Type",
      "Course Title",
      "Course Description",
      "Instructor(s)",
      "Syllabus Link",
      "Course Levels",
      "RPP",
      "WRIT",
      "CBLR",
      "FYS",
      "SOPH",
      "COEX",
      "Premodern",
      "Remote Accessible",
      "Remote Only",
      "Semester",
      "Year",
      "Geography",
      "Course Type",
      "Proposal Status",
      "Course Status",
      "Course Number",
      "Final Time",
      "Further Notes",
      "Transcript Title",
      "Unavailable Times to Teach",
      "Time Choice 1",
      "Time Choice 2",
      "Time Choice 3",
    ];
    const csvContent = Papa.unparse({ fields: columns, data: rows });
    downloadFile(
      showAllCourses ? "all-courses" : "director-accepted-courses",
      csvContent,
      "text/csv"
    );
  };

  return (
    <div className="CourseReview">
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

        <Box sx={{ width: 500, margin: 0 }}>
          <Typography variant="h2" paddingBottom={5}>
            Review Courses
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
          <Button variant="contained" onClick={() => onDownload(false)}>
            Export Director Accepted Courses
          </Button>
          <p></p>
          <Button variant="contained" onClick={() => onDownload(true)}>
            Export All Courses
          </Button>
        </Box>
        <Typography variant="h4" color="#992525" fontWeight={500} marginY={3}>
          To Review
        </Typography>

        {filterByYearSem(underReviewCourses)?.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            status={true}
            canEdit={
              user?.role === "manager" ||
              user?.role === "curriculum coordinator"
            }
            canAccept={
              user?.role === "manager" ||
              user?.role === "graduate director" ||
              user?.role === "undergraduate director"
            }
            canNewProposal={false}
            isRestrictedView={
              user?.role === "professor" &&
              course.proposal_status === "accepted by CCC"
            }
            selectedSems={curSemsToIdx()}
          />
        ))}

        <Typography
          variant="h4"
          color="#992525"
          fontWeight={500}
          marginBottom={3}
          paddingTop="30px"
        >
          Reviewed
        </Typography>

        <Typography variant="body2" my={"12px"} mx="auto">
          To see courses accepted by CCC , please see the Course Catalog.
        </Typography>

        <Typography
          variant="h6"
          color="#992525"
          fontWeight={500}
          marginBottom={3}
        >
          Accepted by Director:
        </Typography>

        {filterByYearSem(directorAcceptedCourses)?.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            status={true}
            canEdit={
              user?.role === "manager" ||
              user?.role === "curriculum coordinator"
            }
            canAccept={user?.role !== "curriculum coordinator"}
            canNewProposal={false}
            isRestrictedView={
              user?.role === "professor" &&
              course.proposal_status === "accepted by CCC"
            }
            selectedSems={curSemsToIdx()}
          />
        ))}

        <Typography
          variant="h6"
          color="#992525"
          fontWeight={500}
          marginBottom={3}
        >
          Revisions Requested:
        </Typography>

        {filterByYearSem(cccRejectedCourses)?.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            status={true}
            canEdit={
              user?.role === "manager" ||
              user?.role === "curriculum coordinator"
            }
            canAccept={user?.role !== "curriculum coordinator"}
            canNewProposal={false}
            isRestrictedView={
              user?.role === "professor" &&
              course.proposal_status === "accepted by CCC"
            }
            selectedSems={curSemsToIdx()}
          />
        ))}

        <Typography variant="h4" color="#992525" fontWeight={500} marginY={3}>
          Withdrawn Courses
        </Typography>

        {filterByYearSem(withdrawnCourses, true)?.map((course, index) => (
          <CourseCard
            key={index}
            course={course}
            status={true}
            canEdit={
              user?.role === "manager" ||
              user?.role === "curriculum coordinator"
            }
            canAccept={
              user?.role === "manager" ||
              user?.role === "graduate director" ||
              user?.role === "undergraduate director"
            }
            canNewProposal={false}
            isRestrictedView={
              user?.role === "professor" &&
              course.proposal_status === "accepted by CCC"
            }
            selectedSems={curSemsToIdx()}
          />
        ))}
      </Box>

      <Dialog open={alertOpen}>
        <DialogTitle>{alertTitle}</DialogTitle>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              setAlertOpen(false);
              if (alertPath) {
                navigate(-1);
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CourseReview;
