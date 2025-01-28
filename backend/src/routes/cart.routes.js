import { Router } from "express";
import verifyUser from "../middlewares/userAuth.js";
import {
  addToCart,
  clearCart,
  getUserCart,
  updateCart,
} from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add", verifyUser, addToCart);

cartRouter.put("/update", verifyUser, updateCart);

cartRouter.get("/list", verifyUser, getUserCart);

cartRouter.post("/clear", verifyUser, clearCart);

export default cartRouter;
