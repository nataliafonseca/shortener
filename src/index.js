import express from "express";
import { router as userRouter } from "./routes/UserRouter.js";
import morgan from "morgan";

const app = express();
app.use(express.json());

app.use(morgan("dev"));

app.use("/api/user", userRouter);

app.listen("3333", () => {
  console.log("🔥 Server running on port 3333!");
});
