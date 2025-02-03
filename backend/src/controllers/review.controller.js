import mongoose from "mongoose";
import Product from "../models/product.model.js";
import Review from "../models/review.model.js";
import User from "../models/user.model.js";

export const addReview = async (req, res) => {
  try {
    const { rating, review, userId, productId } = req.body;

    if (!review || !rating)
      return res.json({
        success: false,
        message: "Provide review and a rating.",
      });

    const findUser = await User.findById(userId);

    if (!findUser)
      return res.json({ success: false, message: "User not found" });

    const findProduct = await Product.findById(productId);

    if (!findProduct)
      return res.json({ success: false, message: "Product not found" });

    const findReview = await Review.findOne({ productId, userId });

    if (findReview)
      return res.json({
        success: false,
        message: "User already have a review on this product.",
      });

    await Review.create({ userId, review, rating, productId });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.aggregate([
      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: {
            $first: "$user",
          },
        },
      },
    ]);

    return res.json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    const findReview = await Review.findById(reviewId);

    if (!findReview)
      return res.json({ success: false, message: "Review not found" });

    await Review.findByIdAndDelete(reviewId);

    res.json({ success: true, message: "Review Deleted" });
  } catch (error) {
    console.log(error);
    return { success: false, message: error.message };
  }
};
