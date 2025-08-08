import express from "express";
import { errorHandler } from "./middleware/error.middleware.js";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";


dotenv.config();
const app = express();

// json
app.use(express.json());
// urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/auth", authRouter);
app.use("/v1/api/users", userRouter);

const PORT = process.env.PORT || 3000;

// error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
