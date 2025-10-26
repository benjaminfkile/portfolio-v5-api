import express, { Express, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
//import helmet from "helmet";
import healthRouter from "./routers/healthRouter";
import contentRouter from "./routers/contentRouter";
import mediaRouter from "./routers/mediaRouter";

const app: Express = express();

app.use(morgan("common"));
app.use(cors());
//!! doesnt need helmet because the gateway api that runs on the same ec2 instance this does has it
//app.use(helmet())

app.get("/", (req: Request, res: Response) => {
  res.send("portfolio-api");
});

app.use("/api/health", healthRouter)
app.use("/api/portfolio-content", contentRouter);
app.use("/api/media", mediaRouter)

app.use(function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

export default app;
