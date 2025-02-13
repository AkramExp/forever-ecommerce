import { Router } from "express";
import verifyUser from "../middlewares/userAuth.js";
import {
  allOrders,
  placeOrderCod,
  placeOrderRazorpay,
  placeOrderStripe,
  toggleOrderState,
  userOrders,
  verifyOrder,
  verifyRazorpay,
} from "../controllers/order.controller.js";
import verifyAdmin from "../middlewares/adminAuth.js";

const orderRouter = Router();

orderRouter.post("/verify", verifyOrder);

orderRouter.post("/place-cod", verifyUser, placeOrderCod);

orderRouter.post("/stripe", verifyUser, placeOrderStripe);

orderRouter.post("/razorpay", verifyUser, placeOrderRazorpay);

orderRouter.post("/verify-razorpay", verifyRazorpay);

orderRouter.get("/user-orders", verifyUser, userOrders);

orderRouter.get("/all-orders", allOrders);

orderRouter.put("/toggle-state", verifyAdmin, toggleOrderState);

export default orderRouter;
