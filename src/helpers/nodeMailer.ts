import nodemailer from "nodemailer";
import User from "@/models/userSchema";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Creating a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY")
      await User.findByIdAndUpdate(userId, {
        verifiedToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    else if (emailType === "RESET")
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.nodemailerUser,
        pass: process.env.nodemailerPassword,
      },
    });

    const mailOptions = {
      from: "nextauth@app.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href = "${
        process.env.domain
      }/verifyemail?token=${hashedToken}">Here</a> to
       ${
         emailType === "VERIFY" ? "Verify your email" : "Reset your password"
       } or copy paste the link below to virfy :<br/> ${
        process.env.domain
      }/verifyemail?token=${hashedToken}</p>
        `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
  } catch (error: any) {
    console.log("Error occured", error.message);
  }
};
