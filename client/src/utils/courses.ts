import { ICourse } from '../../../server/src/models/Course';

// fetches the user if the user is logged in on the backend

export async function fetchCourses(
    setCourses: (courses: ICourse[]) => void,
    setError: (error: string) => void,
    params: any
  ) {
      console.log(params);
    try {
        if (params == null){
            const res = await fetch(
                `${process.env.REACT_APP_SERVER_URL}/courses/search/true`,
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
            var url = new URL(`${process.env.REACT_APP_SERVER_URL}/courses/search/false`)
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
                console.log(resJson);
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
