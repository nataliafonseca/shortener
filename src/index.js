import express from "express";
import { router as userRouter } from "./routes/UserRouter.js";

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.listen("3333", () => {
  console.log("🔥 Server running on port 3333!");
});