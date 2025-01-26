import { v2 as cloudinary } from "cloudinary";
import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const upload = await cloudinary.uploader.upload(image.path, {
          resource_type: "image",
          folder: "forever",
        });
        return upload.secure_url;
      })
    );

    await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
      image: uploadedImages,
    });

    res.json({ success: true, message: "Product Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const exists = await Product.findById(req.body?.id);

    if (!exists)
      return res.json({ success: false, message: "Product doesn't exists" });

    await Product.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body?.id);

    if (!product)
      return res.json({ success: false, message: "Product doesn't exists" });

    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();

    res.json({ success: true, allProducts });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
