import { Router } from "express";
import {
  adminLogin,
  getUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller.js";
import verifyUser from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.get("/", verifyUser, getUser);

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/admin", adminLogin);

export default userRouter;
