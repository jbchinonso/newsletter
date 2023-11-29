import { randomBytes, createHash } from "crypto";
import { Request, Response, NextFunction } from "express";
import nodemailer from "nodemailer";
import {ImailVariables, Template } from "./types.utils";

export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: any) => next(err));
  };
};

export const createVerificationToken = (): string => {
  const hash = randomBytes(32).toString("hex");

  const verificationToken = createHash("sha256").update(hash).digest("hex");

  return verificationToken;
};

const sendMail = async (
  recipient: string,
  subject: string,
  variables: ImailVariables,
  template: Template
) => {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: `Newsletter <${process.env.MAIL_USER}>`,
    to: recipient,
    subject: subject,
    text: template(variables).text,
    html: template(variables).html,
  };

  const deliverEmail = transport.sendMail(mailOptions);
  return deliverEmail;
};

export default sendMail;
