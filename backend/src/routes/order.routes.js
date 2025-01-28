import { Router } from "express";
import verifyUser from "../middlewares/userAuth.js";
import {
  allOrders,
  placeOrderCod,
  userOrders,
} from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place-cod", verifyUser, placeOrderCod);

orderRouter.get("/user-orders", verifyUser, userOrders);

orderRouter.get("/all-orders", allOrders);

export default orderRouter;
