import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./utils/auth.js";
import exerciseRouter from "./routes/exerciseRoute.js";
import scheduleRouter from "./routes/scheduleRoute.js";
import { errorHandler } from "./middleware/errorHandler.js";
import referencesRouter from "./routes/referencesRoute.js";
import logRouter from "./routes/logRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/references", referencesRouter); 
app.use("/api/schedules/:scheduleId/exercises", exerciseRouter);
app.use("/api/schedules", scheduleRouter);
app.use("/api/logs", logRouter);

app.use(errorHandler); // Custom error handler

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
