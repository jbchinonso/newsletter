"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerificationToken = exports.catchAsync = void 0;
const crypto_1 = require("crypto");
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => next(err));
    };
};
exports.catchAsync = catchAsync;
const createVerificationToken = () => {
    const hash = (0, crypto_1.randomBytes)(32).toString("hex");
    const verificationToken = (0, crypto_1.createHash)("sha256")
        .update(hash)
        .digest("hex");
    return verificationToken;
};
exports.createVerificationToken = createVerificationToken;
