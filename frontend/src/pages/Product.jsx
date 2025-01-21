import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);

  const fetchProductData = async () => {};
  return <div>Product</div>;
};

export default Product;
