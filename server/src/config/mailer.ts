import nodemailer, { SentMessageInfo } from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});

function sendEmail(
  to: string,
  subject: string,
  text: string
): Promise<SentMessageInfo> {
  return transporter.sendMail({
    from: `"Department of History Course Proposals" ${process.env.GMAIL_USERNAME}`,
    to,
    subject,
    text,
  });
}

// placeholder functionality
export function sendAcceptEmail(to: string) {
  sendEmail(
    to,
    "Course Proposal Accepted",
    `Hey!
    \nYour course proposal has been accepted!
    \nGo to ${process.env.CLIENT_URL} for more information.
    \n--\nDepartment of History Course Proposals Automated Message`
  );
}
