import { ICourse } from '../../../server/src/models/Course';

// fetches the user if the user is logged in on the backend

export async function fetchCourses(
    setCourses: (courses: ICourse[]) => void,
    setError: (error: string) => void,
    params: any,
    finalized: boolean
  ) {
    //   console.log(params);
    try {
        if (params == null){
            const res = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/courses/search/${finalized}`,
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
            var url = new URL(`${process.env.REACT_APP_SERVER_URL}/courses/search/${finalized}`)
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            // console.log(url)
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
                // console.log(res)
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
    course_info: any,
  ) {
    try {
        const res = await fetch(
            `${process.env.REACT_APP_SERVER_URL}/courses/submit`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(course_info),   
            }
        );
        console.log(res.status);

        // if the user is logged in, set the user and authenticated flag
        if (res.status === 200) {
            console.log("i succeeded!")
            const resJson = await res.json();
            // setSuccess(true)
            return true;
        } else {
            console.log("I failed :(")
            throw new Error("failed to submit user");
        }
    } catch (error) {
        // setError("Failed to authenticate user");
        return false;
    }
  } 