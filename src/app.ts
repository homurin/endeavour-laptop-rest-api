import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import { SendError } from "./utils/apiError";
import errorController from "./controllers/errorController";
import morgan from "morgan";

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new SendError("endpoint not found", 404));
});

app.use(errorController);

export default app;
