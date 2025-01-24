import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("Server started on port " + port);
});
