import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.PASSWORD
    }
  });
export const check_credentials = () => { 
  console.log("Auth:", process.env.EMAIL_USERNAME, process.env.PASSWORD);
}
export default transport;