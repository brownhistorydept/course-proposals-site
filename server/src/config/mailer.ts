import nodemailer from "nodemailer";
import { ICourse } from "../models/Course";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function sendEmail(to: string[], subject: string, text: string): any {
  return transporter.sendMail({
    from: `"Department of History Course Proposals" ${process.env.GMAIL_USERNAME}`,
    to,
    subject,
    text,
  });
}

// placeholder functionality
export function sendAcceptEmail(
  to: string[],
  course: ICourse,
  reason: string,
  managerReason: string,
  isDirector: boolean
) {
  sendEmail(
    to,
    "Course Proposal Accepted",
    `Hello,
    \nYour course proposal titled "${
      course.course_title
    }" has been accepted by ${isDirector ? "a director" : "the CCC"}${
      typeof reason === "undefined"
        ? "."
        : ` and received the following comments:\n\n ${reason}`
    }${typeof managerReason === "undefined" ? "" : `\n ${managerReason}`}
    \nGo to ${
      process.env.CLIENT_URL
    } and select "My Courses" on the upper right menu, locate the relevant course and select "View Course" to see the course.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

// placeholder functionality
export function sendRejectEmail(
  to: string[],
  course: ICourse,
  reason: string,
  managerReason: string,
  isDirector: boolean
) {
  sendEmail(
    to,
    "Course Proposal Revision Request",
    `Hello,
    \n${
      isDirector ? "A director" : "The Student Affairs Manager"
    } has requested that you revise your course proposal titled "${
      course.course_title
    }" ${
      typeof reason === "undefined"
        ? "."
        : ` for the following comments:\n\n ${reason}\n`
    }${typeof managerReason === "undefined" ? "" : `\n ${managerReason}`}
    \nGo to ${
      process.env.CLIENT_URL
    } and select "My Courses" on the upper right menu, locate the relevant course and select "View Course," then select "Edit" at the bottom of the screen.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

export function sendRevisionEmail(
  to: string[],
  course: ICourse,
  reviser: string
) {
  sendEmail(
    to,
    "Course Revised",
    `Hello,
    \nThe course proposal titled "${course.course_title}" has been edited by ${reviser} since it was last reviewed.
    \nGo to ${process.env.CLIENT_URL} and select "Review Courses" on the upper right menu, locate the relevant course and select "View Course" to see the course.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

export function sendWithdrawalEmail(
  to: string[],
  course: ICourse,
  reviser: string
) {
  sendEmail(
    to,
    "Course Revised",
    `Hello,
    \nThe course proposal titled "${course.course_title}" has been withdrawn by ${reviser} since it was last reviewed.
    \nGo to ${process.env.CLIENT_URL} and select "Review Courses" on the upper right menu, locate the relevant course under "Withdrawn Courses" and select "View Course" to see the course.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

export function sendDeleteEmail(
  to: string[],
  course: ICourse,
  reviser: string
) {
  sendEmail(
    to,
    "Course Revised",
    `Hello,
    \nThe course proposal titled "${course.course_title}" has been deleted by ${reviser}.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}
