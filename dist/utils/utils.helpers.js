"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerificationToken = exports.catchAsync = void 0;
const crypto_1 = require("crypto");
const nodemailer_1 = __importDefault(require("nodemailer"));
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
const createVerificationToken = () => {
    const hash = (0, crypto_1.randomBytes)(32).toString("hex");
    const verificationToken = (0, crypto_1.createHash)("sha256").update(hash).digest("hex");
    return verificationToken;
};
exports.createVerificationToken = createVerificationToken;
const sendMail = (recipient, subject, variables, template) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
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
});
exports.default = sendMail;
