import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  userId: { ref: "User", type: mongoose.Types.ObjectId, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
  productId: { ref: "Product", type: mongoose.Types.ObjectId, required: true },
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
