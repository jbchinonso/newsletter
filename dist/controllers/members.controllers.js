"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_appError_1 = __importDefault(require("../utils/utils.appError"));
const utils_validators_1 = require("../utils/utils.validators");
const subscribers_model_1 = __importDefault(require("../models/subscribers.model"));
const utils_helpers_1 = __importStar(require("../utils/utils.helpers"));
const welcome_templates_1 = __importDefault(require("../templates/welcome.templates"));
class MemberController {
}
_a = MemberController;
MemberController.join = (0, utils_helpers_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const member = req.body;
    const { error, value: memberInfo } = utils_validators_1.memberValidator.validate(member);
    if (error)
        next(new utils_appError_1.default(error.details[0].message, 400));
    const verificationToken = (0, utils_helpers_1.createVerificationToken)();
    memberInfo.verificationToken = verificationToken;
    const { email, firstName } = memberInfo;
    const subject = "confirm your subscription";
    const variables = {
        name: firstName,
        link: process.env.FRONT_END_URL + `?verify=${verificationToken}`
    };
    yield subscribers_model_1.default.create(memberInfo);
    const mailSent = yield (0, utils_helpers_1.default)(email, subject, variables, welcome_templates_1.default);
    res.json({
        status: res.statusCode,
        message: "Sign succcessful, please check your mail for confirmation link",
        data: null,
    });
}));
MemberController.confirmJoin = (0, utils_helpers_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token: verificationToken } = req.query;
    const verifiedMember = yield subscribers_model_1.default.findOneAndUpdate({ verificationToken }, {
        verified: true,
        verificationDate: Date.now(),
        verificationToken: null
    }, { new: true });
    if (!verifiedMember)
        return next(new utils_appError_1.default('please provide a valid token', 400));
    res.status(200).send({
        status: res.statusCode,
        message: 'subscription confirmed successfully',
        data: verifiedMember
    });
}));
exports.default = MemberController;
