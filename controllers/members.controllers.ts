import { Request, Response, NextFunction } from "express";
import AppError from "../utils/utils.appError";
import { memberValidator } from "../utils/utils.validators";
import Subscriber from "../models/subscribers.model";
import sendMail, {
  catchAsync,
  createVerificationToken,
} from "../utils/utils.helpers";
import welcomeTemplate from "../templates/welcome.templates";

export default class MemberController {
  static join = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const member = req.body;
      const { error, value: memberInfo } = memberValidator.validate(member);

      if (error) next(new AppError(error.details[0].message, 400));

      const verificationToken = createVerificationToken();

      memberInfo.verificationToken = verificationToken;

      const { email, firstName } = memberInfo;
      const subject = "confirm your subscription";
      const variables = {
        name: firstName,
        link: process.env.FRONT_END_URL+`?verify=${verificationToken}`
      };

      await Subscriber.create(memberInfo);
      const mailSent = await sendMail(
        email,
        subject,
        variables,
        welcomeTemplate
      );

      res.json({
        status: res.statusCode,
        message:
          "Sign succcessful, please check your mail for confirmation link",
        data: null,
      });
    }
  );

  static confirmJoin = catchAsync(async(req: Request, res:Response, next:NextFunction) => {
      const {token: verificationToken} = req.query;


      const verifiedMember = await Subscriber.findOneAndUpdate(
        {verificationToken},
        {
          verified: true,
          verificationDate: Date.now(),
          verificationToken: null
        },
        {new: true}
        )

        if(!verifiedMember) return next(new AppError('please provide a valid token', 400))

        res.status(200).send({
          status: res.statusCode,
          message: 'subscription confirmed successfully',
          data: verifiedMember
        })

  })
}
