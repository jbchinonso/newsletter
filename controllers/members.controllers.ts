import { Request, Response, NextFunction } from "express";
import AppError from "../utils/utils.appError";
import { memberValidator } from "../utils/utils.validators";
import Subscriber from "../models/subscribers.model";
import { catchAsync, createVerificationToken } from "../utils/utils.helpers";

export default class MemberController {
  static join = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const member = req.body;
      const { error, value: memberInfo } = memberValidator.validate(member);

      if (error) next(new AppError(error.details[0].message, 400));

      const verificationToken = createVerificationToken();

      memberInfo.verificationToken = verificationToken;

      await Subscriber.create(memberInfo);

      res.json({
        status: res.statusCode,
        message:
          "Sign succcessful, please check your mail for confirmation link",
        data: null,
      });
    }
  );
}
