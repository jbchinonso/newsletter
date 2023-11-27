import { randomBytes, createHash } from "crypto";
import { NextFunction } from "express";

export const catchAsync = (fn: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch((err: any) => next(err));
    };
  };
  

export const createVerificationToken = (): string  => {
    const hash = randomBytes(32).toString("hex");
  
    const verificationToken = createHash("sha256")
      .update(hash)
      .digest("hex");
  
    return verificationToken;
  };

