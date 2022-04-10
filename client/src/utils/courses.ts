import { ICourse } from '../../../server/src/models/Course';

// fetches the user if the user is logged in on the backend

export async function fetchCourses(
    setCourses: (courses: ICourse[]) => void,
    setError: (error: string) => void,
    params: any,
    approved: boolean
  ) {
      console.log(params);
    try {
        if (params == null){
            const res = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/courses/search/${approved}`,
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                    },
                }
            );
            if (res.status === 200) {
                const resJson = await res.json();
                setCourses(resJson.result);
            } else {
                throw new Error("Failed to fetch courses");
            }
        } else{
            var url = new URL(`${process.env.REACT_APP_SERVER_URL}/courses/search/${approved}`)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            const res = await fetch(url.toString(), 
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Credentials": "true",
                    },
                }
            );
            if (res.status === 200) {
                const resJson = await res.json();
                setCourses(resJson.result);
            } else {
                throw new Error("Failed to fetch courses");
            }
        }
        
        // if the user is logged in, set the user and authenticated flag
        
        
    } catch (error) {
        setError("Failed to fetch courses");
    }
  }

  export async function submitCourse(
    setSuccess: (success: boolean) => void,
    setError: (error: string) => void,
    course_info: ICourse
  ) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/courses/submit`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify(course_info),
            }
        );
        // if the user is logged in, set the user and authenticated flag
        if (res.status === 200) {
            const resJson = await res.json();
            console.log(resJson)
        } else {
            throw new Error("failed to submit user");
        }
    } catch (error) {
        setError("Failed to authenticate user");
    }
  } 