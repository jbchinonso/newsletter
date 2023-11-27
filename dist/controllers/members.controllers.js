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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const utils_appError_1 = __importDefault(require("../utils/utils.appError"));
const utils_validators_1 = require("../utils/utils.validators");
const subscribers_model_1 = __importDefault(require("../models/subscribers.model"));
const utils_helpers_1 = require("../utils/utils.helpers");
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
    yield subscribers_model_1.default.create(memberInfo);
    res.json({
        status: res.statusCode,
        message: "Sign succcessful, please check your mail for confirmation link",
        data: null,
    });
}));
exports.default = MemberController;
