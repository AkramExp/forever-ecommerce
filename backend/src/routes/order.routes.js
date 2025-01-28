import { Router } from "express";
import verifyUser from "../middlewares/userAuth.js";
import { placeOrderCod } from "../controllers/order.controller.js";

const orderRouter = Router();

orderRouter.post("/place-cod", verifyUser, placeOrderCod);

export default orderRouter;
