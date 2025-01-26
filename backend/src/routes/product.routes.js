import { Router } from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller.js";
import upload from "../middlewares/multer.js";
import verifyAdmin from "../middlewares/adminAuth.js";

const productRouter = Router();

productRouter.post(
  "/add",
  verifyAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.post("/remove", verifyAdmin, removeProduct);

productRouter.get("/single", singleProduct);

productRouter.get("/list", listProducts);

export default productRouter;
