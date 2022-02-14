import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { router as shortenerRouter } from "./routes/ShortenerRouter.js";
import { router as userRouter } from "./routes/UserRouter.js";

const DATABASE_URL = process.env.DB_URL;
const PORT = process.env.PORT || 3333;

mongoose.connect(DATABASE_URL).then(() => {
  console.log("💾 Database connected!");
});

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use(shortenerRouter);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}!`);
});
