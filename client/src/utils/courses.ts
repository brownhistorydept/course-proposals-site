import { ICourse } from '../../../server/src/models/Course';

export async function fetchCourses(
  setCourses: (courses: ICourse[]) => void,
  params: any,
  finalized: boolean,
  isMounted: boolean = true,
) {
  try {
    var url = new URL(`${process.env.REACT_APP_SERVER_URL}/courses/search/${finalized}`);
    if (params !== null) {
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    }
    const res = await fetch(url.toString(),
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
      },
    );

    if (res.status === 200) {
      const resJson = await res.json();
      if (isMounted) {
        setCourses(resJson.result);
      }
    } else {
      throw new Error("Request to fetch courses was unsuccessful");
    }
  } catch (error) {
    throw new Error("Could not make request to fetch courses");
  }
}

export async function submitCourse(course: any) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/courses/submit`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course),
      }
    );

    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Request to submit course was unsuccessful");
    }
  } catch (error) {
    return false;
  }
}

export async function editCourse(course: any) {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/courses/edit`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course),
      }
    );

    var message = await res.json();

    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Request to edit course was unsuccessful");
    }
  } catch (error) {
    return false;
  }
}

export async function acceptRejectCourse(
  course: any,
  is_accept: boolean,
  reason: string,
) {
  try {
    const url = new URL(`${process.env.REACT_APP_SERVER_URL}/courses/accept-reject/${is_accept}`)
    const res = await fetch(url.toString(), {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        course,
        reason,
      }),
    });

    if (res.status === 200) {
      return true;
    } else {
      throw new Error("Request to accept/reject course was unsuccessful");
    }
  } catch (error) {
    return false;
  }
}
