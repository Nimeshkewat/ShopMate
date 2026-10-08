export const resetPasswordEmail = (resetLink: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #111;">Reset your password</h2>
      <p style="color: #555; font-size: 14px;">
        We received a request to reset your password. This link expires in 10 minutes.
      </p>
      <a href="${resetLink}" style="display: inline-block; margin: 16px 0; padding: 12px 24px; background: #2563eb; color: #fff; text-decoration: none; border-radius: 6px;">
        Reset Password
      </a>
      <p style="color: #999; font-size: 12px;">
        If you didn't request this, you can safely ignore this email.
      </p>
    </div>
  `;
};
export const passwordResetSuccessEmail = (name: string) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
      <h2 style="color: #111;">Hi ${name},</h2>
      <p style="color: #555; font-size: 14px;">
        Your password has been changed successfully.
      </p>
      <p style="color: #555; font-size: 14px;">
        If you did not make this change, please contact our support team immediately
        or reset your password again right away.
      </p>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">
        This is an automated message, please do not reply to this email.
      </p>
    </div>
  `;
};
