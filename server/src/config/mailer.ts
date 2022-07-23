import nodemailer, { SentMessageInfo } from "nodemailer";
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
    `Hey!
    \nYour course proposal titled "${course.course_title}" has been accepted by ${isDirector ? 'a director' : 'the CCC'} and received the following comments:
    \n${reason}
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}

// placeholder functionality
export function sendRejectEmail(to: string[], course: ICourse, reason: string, isDirector: boolean) {
  sendEmail(
    to,
    "Course Proposal Rejected",
    `Sorry,
    \nYour course proposal titled "${course.course_title}" has been rejected by ${isDirector ? 'a director' : 'the CCC'} for the following reason:
    \n${reason}
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}
