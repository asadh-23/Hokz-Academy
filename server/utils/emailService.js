import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

export const sendOtpEmail = async (to, otp) => {
  try {
    const mailOptions = {
        from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
        to,
        subject: `Your OTP for ${process.env.APP_NAME} Verification`,
        html: `
          <style>
            h2 { color: #0f766e; font-family: Arial, sans-serif; }
            h3 { color: #318d2eff; }
            p { font-size: 14px; }
          </style>
          <div>
            <h2>Welcome to ${process.env.APP_NAME} 🎓</h2>
            <p>Your OTP is:</p>
            <h3>${otp}</h3>
            <p>This OTP will expire in 5 minutes.</p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);

  }catch(error){
    console.log("Failed to send otp email", error);
    throw error;
  }
};

export const sendPasswordResetEmail = async (to, passwordResetToken, role) => {

  try{

    const frontendUrl = process.env.FRONTEND_URL;
    const resetUrl = `${frontendUrl}/${role}/reset-password/${passwordResetToken}`;
  
    const mailOptions = {
        from: `${process.env.APP_NAME} <${process.env.EMAIL_USER}>`,
        to,
        subject: `Password Reset Request - ${process.env.APP_NAME}`,
        html: `
          <div style="font-family: Arial,sans-serif; background: #f4f7fa; margin:0; padding:0;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f7fa;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;margin:40px auto 0 auto;background:#fff;border-radius:8px;box-shadow:0 1px 10px #e1e8ed;">
                    <!-- Brand Header -->
                    <tr>
                      <td align="center" style="background: linear-gradient(90deg,#16c6ff 0%, #0ea5e9 100%); padding: 36px 0 24px 0; border-radius:8px 8px 0 0;">
                        <h1 style="color:#fff; font-size:2.1rem; letter-spacing:2px; margin:0;">${process.env.APP_NAME}</h1>
                      </td>
                    </tr>
        
                    <!-- Main Content -->
                    <tr>
                      <td style="padding:36px 32px 20px 32px;">
                        <h2 style="color:#0ea5e9; font-size:1.6rem; margin-top:0; margin-bottom:12px;">Reset your password</h2>
                        <p style="color:#444; line-height:1.6; font-size:1rem; margin-bottom:26px;">
                          We received a request to reset your password for your ${process.env.APP_NAME} account.<br>
                          To proceed, click the button below:
                        </p>
                        <div style="text-align:center;margin-bottom:32px;">
                          <a href="${resetUrl}"
                             target="_blank"
                             style="display:inline-block; padding:14px 34px; background:#0ea5e9; color:#fff; text-decoration:none; font-size:1.06rem; border-radius:7px; font-weight:bold; box-shadow:0 2px 6px #bbeeff80;">
                            Reset Password
                          </a>
                        </div>
                        <p style="color:#555; font-size:1rem;line-height:1.6; margin-bottom:12px;">
                          Or copy and paste this link into your browser:
                        </p>
                        <div style="background:#f0f6fa;color:#277ae3; border-left:4px solid #0ea5e9; border-radius:4px; font-size:0.98rem; word-break:break-all; padding:11px 16px; margin-bottom:16px;">
                          <a href="${resetUrl}" style="color:#0ea5e9; text-decoration:none;">${resetUrl}</a>
                        </div>
                        <div style="background:#fff6e5; border-left:4px solid #ffc107; border-radius:4px;padding:12px 16px;margin:26px 0 18px 0;">
                          <span style="color:#a87613; font-size:0.99rem;">
                          <b>⏰ Note:</b> This reset link is valid for <b>10 minutes</b> only. For account security, please ignore this if you didn't request a password reset.
                          </span>
                        </div>
                        <p style="margin:0; color:#888; font-size:0.99rem">
                          If you run into issues, contact our support team at <a href="mailto:support@${process.env.APP_NAME.toLowerCase().replace(/\s+/g, '')}.com" style="color:#0ea5e9">support@${process.env.APP_NAME.toLowerCase().replace(/\s+/g, '')}.com</a>.
                        </p>
                      </td>
                    </tr>
        
                    <!-- Footer -->
                    <tr>
                      <td align="center" style="padding:22px 0 12px 0;">
                        <hr style="border:none; border-top:1px solid #e8ecef; margin:0 0 16px 0;" />
                        <p style="color:#a6b3be; font-size:12px;margin:0;">This is an automated message from ${process.env.APP_NAME}. Please do not reply.</p>
                        <p style="color:#a6b3be; font-size:12px;margin:8px 0 0 0;">&copy; ${new Date().getFullYear()} ${process.env.APP_NAME}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        `,
    };
  
    await transporter.sendMail(mailOptions);
    
  }catch(error){
    console.log("Failed to send password rest email",error);
    throw error;
  }

};
