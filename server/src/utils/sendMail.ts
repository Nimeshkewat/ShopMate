import brevo from "../config/brevo.js";
import {
  passwordResetSuccessEmail,
  resetPasswordEmail,
} from "../modules/auth/emailTemplate.js";

const sendEmail = async (
  email: string,
  subject: string,
  htmlContent: string
) => {
  const senderEmail = process.env.SENDER_EMAIL;

  if (!senderEmail) {
    throw new Error("SENDER_EMAIL environment variable is required");
  }

  await brevo.transactionalEmails.sendTransacEmail({
    sender: { email: senderEmail },
    to: [{ email }],
    subject,
    htmlContent,
  });
};

export const sendResetPasswordLink = async (
  email: string,
  resetLink: string
) => {
  await sendEmail(email, "Reset your password", resetPasswordEmail(resetLink));
};

export const sendResetPasswordSuccess = async (
  email: string,
  username: string
) => {
  await sendEmail(
    email,
    "Reset your password",
    passwordResetSuccessEmail(username)
  );
};
