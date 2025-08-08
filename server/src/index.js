import express from "express";
import authRouter from "./routes/auth.route.js";
import { errorHandler } from "./middleware/error.middleware.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// json
app.use(express.json());
// urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/auth", authRouter);

const PORT = process.env.PORT || 3000;

// error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
