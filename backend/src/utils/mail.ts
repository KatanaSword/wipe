import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { IOptions } from "../type";

const sendEmail = async (options: IOptions): Promise<void> => {
  // Configure mailgen by setting a theme and your product info
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      // Appears in header & footer of e-mails
      name: "Wipe",
      link: "https://mailgen.js/",
      // Custom copyright notice
      copyright: "Copyright © 2024 Wipe. All rights reserved.",
    },
  });

  // Generate an HTML email with the provided contents
  const emailHTML = mailGenerator.generate(options.mailgenClient);

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailText = mailGenerator.generatePlaintext(options.mailgenClient);

  const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: +process.env.NODEMAILER_PORT!,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.NODEMAILER_HOST, // sender address
      to: options.email, // list of receivers
      subject: options.subject, // Subject line
      text: emailText, // plain text body
      html: emailHTML, // html body
    });
  } catch (error) {
    console.error(
      "Email service failed silently. Make sure you have provided your NODEMAILER credentials in the .env file"
    );
    console.log("Error", error);
  }
};

const forgotPasswordMailgenContentEmail = (
  username: string,
  forgotPasswordRedirectUrl: string
) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a password reset request for your account was received",
      action: {
        instructions: "Click the button to reset your password:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Reset your password",
          link: forgotPasswordRedirectUrl,
        },
      },
      outro:
        "If you did not request a password reset. no further action is required on your part",
    },
  };
};

const verifyEmailMailgenContentEmail = (
  username: string,
  verificationToken: string
) => {
  return {
    body: {
      name: username,
      intro:
        "You have received this email because a verify email request for your account was received",
      action: {
        instructions: "Click the button to verify your email:",
        button: {
          color: "#22BC66", // Optional action button color
          text: "Verify your email",
          link: verificationToken,
        },
      },
      outro:
        "If you did not request a verify email. no further action is required on your part",
    },
  };
};

export {
  sendEmail,
  forgotPasswordMailgenContentEmail,
  verifyEmailMailgenContentEmail,
};
