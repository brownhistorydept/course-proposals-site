import nodemailer from "nodemailer";
import { ICourse } from "../models/Course";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function sendEmail(
  to: string[],
  subject: string,
  text: string
): any {
  return transporter.sendMail({
    from: `"Department of History Course Proposals" ${process.env.GMAIL_USERNAME}`,
    to,
    subject,
    text,
  });
}

// placeholder functionality
export function sendAcceptEmail(to: string[], course: ICourse, reason: string, isDirector: boolean) {
  sendEmail(
    to,
    "Course Proposal Accepted",
    `Hello,
    \nYour course proposal titled "${course.course_title}" has been accepted by ${isDirector ? 'a director' : 'the CCC'}${typeof reason === 'undefined' ? '.' : ` and received the following comments:\n\n ${reason}`}
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

// placeholder functionality
export function sendRejectEmail(to: string[], course: ICourse, reason: string, isDirector: boolean) {
  sendEmail(
    to,
    "Course Proposal Revision Request",
    `Hello,
    \n${isDirector ? 'A director' : 'The Student Affairs Manager'} has requested that you revise your course proposal titled "${course.course_title}" ${typeof reason === 'undefined' ? '.' : ` for the following reason:\n\n ${reason}\n`}
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

export function sendRevisionEmail(to: string[], course: ICourse, reviser: string) {
  sendEmail(
    to,
    "Course Revised",
    `Hello,
    \nThe course proposal titled "${course.course_title}" has been edited by ${reviser} since it was last reviewed.
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  )
}
