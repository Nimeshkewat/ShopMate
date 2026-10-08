import transporter from "../config/nodemailer.js";
import {
  passwordResetSuccessEmail,
  resetPasswordEmail,
} from "../modules/auth/emailTemplate.js";

export const sendResetPasswordLink = async (
  email: string,
  resetLink: string
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: resetPasswordEmail(resetLink),
  });
};

export const sendResetPasswordSuccess = async (
  email: string,
  username: string
) => {
  await transporter.sendMail({
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Reset your password",
    html: passwordResetSuccessEmail(username),
  });
};
