import { Router } from "express";
import verifyUser from "../middlewares/userAuth.js";
import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", verifyUser, addToCart);

cartRouter.put("/update", verifyUser, updateCart);

cartRouter.get("/list", verifyUser, getUserCart);

export default cartRouter;
