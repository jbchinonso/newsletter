import express, { Request, Response, NextFunction } from "express";
import indexRouter from "./routes/index";
import memberRouter from "./routes/members.routes";
import dotenv from 'dotenv'

dotenv.config();

export default function () {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/", indexRouter);
  app.use("/api/v1/members", memberRouter);

  process.on("unhandledRejection", function (reason, p) {
    console.log("Unhandled", reason, p); // log all your errors, "unsuppressing" them.
    throw reason; // optional, in case you want to treat these as errors
  });

  //404 catcher
  app.all("*", (req, res, next) => {
    const msg = `Can't find ${req.originalUrl} on this server!`;
    console.error(msg);
    res.status(404).send({ status: res.statusCode, message: msg, data: null });
    // next()
  });

  //Gobal error
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(err.statusCode || 400).send({
      message: err.message,
      status: err.statusCode || 400,
      data: null,
    });
  });

  return app;
}
