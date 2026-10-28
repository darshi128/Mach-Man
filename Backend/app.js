import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./db/db.js";
import { errorMiddleware } from "./middleware/errorMidleware.js";
import userRouter from "./router/userRouter.js";
import machineRouter from "./router/machineRouter.js";
import maintenanceRouter from "./router/maintenanceRouter.js";
import dashboardRouter from "./router/dashboardRouter.js";

const app = express();
config({ path: "./config/.env" });


app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "./tmp/",
    })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/machine", machineRouter);
app.use("/api/v1/maintenance", maintenanceRouter);
app.use("/api/v1/dashboard", dashboardRouter);

dbConnection();
app.use(errorMiddleware);

export default app;