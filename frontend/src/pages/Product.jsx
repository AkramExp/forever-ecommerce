import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../App";
import ReviewCard from "../components/ReviewCard";
import { UserContext } from "../context/UserContext";

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart, token } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState(null);
  const [size, setSize] = useState("");
  const [switchState, setSwitchState] = useState("reviews");
  const [rating, setRating] = useState(1);
  const [userReview, setUserReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const { user } = useContext(UserContext);

  const fetchProductData = async () => {
    const response = await axios.get(backend_url + `/api/product/${productId}`);

    if (response.data.success) {
      setProductData(response.data.product);
      setImage(response.data.product.image[0]);
    } else {
      toast.error(response.data.message);
    }
  };

  const addReview = async () => {
    try {
      if (!userReview) return;

      const response = await axios.post(
        backend_url + "/api/review/add",
        {
          review: userReview,
          rating,
          productId,
        },
        { headers: { token } }
      );

      if (response.data.success) {
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        backend_url + `/api/review/${productId}`
      );

      if (response.data.success) {
        setReviews(response.data.reviews);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchProductData();
  }, []);

  const isUserReview = reviews?.find(
    (review) => review?.user._id === user?._id
  );

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:flex-row">
        <div className="flex-1 flex-col-reverse flex gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                src={item}
                key={index}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <img src={assets.star_icon} alt="" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    size === item ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      <div className="mt-20">
        <div className="flex">
          <p
            onClick={() => setSwitchState("description")}
            className={`border px-5 py-3 cursor-pointer font-medium ${
              switchState === "description" && "bg-orange-200 font-semibold"
            }`}
          >
            Description
          </p>
          <p
            onClick={() => setSwitchState("reviews")}
            className={`border px-5 py-3 cursor-pointer font-medium ${
              switchState === "reviews" && "bg-orange-200 font-semibold"
            }`}
          >
            Reviews
          </p>
        </div>
        {switchState === "description" ? (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
            <p>
              Crafted with premium-quality fabric, this outfit is designed to
              offer the perfect balance of style, comfort, and durability. The
              thoughtful detailing and impeccable stitching ensure a flawless
              finish, while the flattering fit complements all body types,
              making it a versatile addition to your wardrobe. Its breathable
              material provides all-day comfort, whether you're out for a casual
              day, attending a special event, or simply relaxing in style.
            </p>
            <p>
              Whether you're heading out for a casual day or dressing up for an
              event, this piece will keep you looking effortlessly chic and
              feeling confident all day long, Easy to pair with your favorite
              accessories and footwear, this outfit is your go-to choice for
              creating effortlessly chic looks that make a statement wherever
              you go.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 overflow-auto max-h-[15rem] ">
            {reviews?.find((review) => review?.user._id === user?._id) ? (
              <ReviewCard
                fetchReviews={fetchReviews}
                reviewItem={isUserReview}
              />
            ) : (
              <div className="flex items-start gap-4 p-4 rounded-md mb-3 bg-gray-100">
                <div className="flex flex-col gap-2 w-full">
                  <input
                    type="text"
                    className="border border-gray-300 rounded py-1.5 px-3.5 text-lg w-full"
                    placeholder="Enter your review"
                    onChange={(e) => setUserReview(e.target.value)}
                  />
                  <div className="flex items-center gap-2">
                    <FaStar
                      onClick={() => setRating(1)}
                      className={`w-5 h-5 cursor-pointer ${
                        rating >= 1 ? "fill-yellow-400" : "fill-black"
                      }`}
                    />
                    <FaStar
                      onClick={() => setRating(2)}
                      className={`w-5 h-5 cursor-pointer ${
                        rating >= 2 ? "fill-yellow-400" : "fill-black"
                      }`}
                    />
                    <FaStar
                      onClick={() => setRating(3)}
                      className={`w-5 h-5 cursor-pointer ${
                        rating >= 3 ? "fill-yellow-400" : "fill-black"
                      }`}
                    />
                    <FaStar
                      onClick={() => setRating(4)}
                      className={`w-5 h-5 cursor-pointer ${
                        rating >= 4 ? "fill-yellow-400" : "fill-black"
                      }`}
                    />
                    <FaStar
                      onClick={() => setRating(5)}
                      className={`w-5 h-5 cursor-pointer ${
                        rating >= 5 ? "fill-yellow-400" : "fill-black"
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={addReview}
                  className="bg-black text-white px-4 py-1 text-lg"
                >
                  Add
                </button>
              </div>
            )}
            <div>
              {reviews
                .filter((review) => review.user._id !== user?._id)
                .map((review, index) => (
                  <div
                    key={index}
                    className="border-t-[1px] border-gray-300 pt-4"
                  >
                    <ReviewCard key={review._id} reviewItem={review} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="w-full h-[30vh] flex items-center justify-center">
      <h1 className="font-bold text-3xl">Product Not Found</h1>
    </div>
  );
};

export default Product;
