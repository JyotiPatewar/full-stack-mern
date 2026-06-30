import User from "../models/User.js";
import jwt from "jsonwebtoken";
// import twilio from "twilio";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
// import { Resend } from "resend";
dotenv.config();

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // app password
//   },
// });

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_LOGIN,
    pass: process.env.BREVO_SMTP_KEY,
  },
});


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    await user.save();

    await transporter.sendMail({
      from: '"CleanTrack" <jyotipatewar2004@gmail.com>',
      to: email,
      subject: "CleanTrack OTP Verification",
      html: `
      <div style="font-family:Arial;padding:20px">
          <h2>CleanTrack</h2>

          <p>Hello ${user.name},</p>

          <p>Your OTP is</p>

          <h1 style="letter-spacing:5px">${otp}</h1>

          <p>This OTP is valid for 10 minutes.</p>

      </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================
// SEND OTP
// ======================
// export const sendOtp = async (req, res) => {
//   try {
//     const { mobile } = req.body;

//     const user = await User.findOne({ mobile });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }
//      console.log("Mo",user.mobile);

//     const verification = await client.verify.v2
//       .services(process.env.TWILIO_VERIFY_SERVICE_SID)
//       .verifications.create({
       
//         to: `+91${mobile}`,
//         channel: "sms",
//       });

//     console.log(
//       "Verification SID:",
//       verification.sid
//     );

//     return res.status(200).json({
//       message: "OTP Sent Successfully",
//     });

//   } catch (error) {

//     console.log(error);

//     return res.status(500).json({
//       message: error.message,
//     });

//   }
// };


// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // OTP generate
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     user.otp = otp;
//     await user.save();

//     // SEND EMAIL
//     await transporter.sendMail({
//       from: `"CleanTrack" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       html: `
//         <div style="font-family: Arial;">
//           <h2>CleanTrack OTP Verification</h2>
//           <p>Your OTP is:</p>
//           <h1>${otp}</h1>
//           <p>This OTP is valid for 10 minutes.</p>
//         </div>
//       `,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//     });

//   } catch (error) {
//     console.log("OTP ERROR:", error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


// const resend = new Resend('re_D9PAfc8Y_6L6RtSMFm2ZxMAFYrHQMvmMA');

// export const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save OTP in DB
//     user.otp = otp;
//     await user.save();

    

// const result = await resend.emails.send({
// from: "onboarding@resend.dev",
//   to: email,
//   subject: "CleanTrack OTP Verification",
//   html: `
//     <div style="font-family: Arial;">
//       <h2>CleanTrack Verification</h2>
//       <p>Your OTP is:</p>
//       <h1>${otp}</h1>
//       <p>Valid for 10 minutes</p>
//     </div>
//   `,
// });

// console.log("EMAIL SENT:", result);
//     return res.status(200).json({
//       success: true,
//       message: "OTP sent successfully",
//     });

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };




// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     user.isVerified = true;
//     user.otp = "";
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "30d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,
//       user,
//     });

//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     if (user.otp !== otp) {
//       return res.status(400).json({
//         message: "Invalid OTP",
//       });
//     }

//     user.isVerified = true;
//     user.otp = "";

//     await user.save();

//     const token = jwt.sign(
//       {
//         id: user._id,
//         role: user.role,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "30d",
//       }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login Successful",
//       token,
//       role: user.role,
//       user,
//     });

//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       message: error.message,
//     });
//   }
// };


export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = "";
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      role: user.role,
      user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};