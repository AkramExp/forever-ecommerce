import { Router } from "express";
import {
  addReview,
  deleteReview,
  getProductReviews,
} from "../controllers/review.controller.js";
import verifyUser from "../middlewares/userAuth.js";

const reviewRouter = Router();

reviewRouter.post("/add", verifyUser, addReview);

reviewRouter.delete("/delete/:reviewId", verifyUser, deleteReview);

reviewRouter.get("/:productId", getProductReviews);

export default reviewRouter;
