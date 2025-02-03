import React, { useContext } from "react";
import { FaStar } from "react-icons/fa6";
import { UserContext } from "../context/UserContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../App";

const ReviewCard = ({ reviewItem, fetchReviews }) => {
  const {
    _id,
    rating,
    review,
    user: { name, _id: userId },
  } = reviewItem;
  const { user, token } = useContext(UserContext);

  const deleteReview = async () => {
    try {
      const response = await axios.delete(
        backend_url + `/api/review/delete/${_id}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchReviews();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h5 className="text-lg font-semibold text-zinc-700">{name}</h5>
        <div className="flex items-center gap-2">
          <FaStar
            className={`w-3 h-3 ${
              rating >= 1 ? "fill-yellow-400" : "fill-black"
            }`}
          />
          <FaStar
            className={`w-3 h-3 ${
              rating >= 2 ? "fill-yellow-400" : "fill-black"
            }`}
          />
          <FaStar
            className={`w-3 h-3 ${
              rating >= 3 ? "fill-yellow-400" : "fill-black"
            }`}
          />
          <FaStar
            className={`w-3 h-3 ${
              rating >= 4 ? "fill-yellow-400" : "fill-black"
            }`}
          />
          <FaStar
            className={`w-3 h-3 ${
              rating >= 5 ? "fill-yellow-400" : "fill-black"
            }`}
          />
        </div>

        <p className="text-base text-zinc-700">{review}</p>
      </div>
      {userId === user?._id && (
        <img
          src={assets.bin_icon}
          alt="bin"
          className="w-4 mr-4 sm:w-5 cursor-pointer"
          onClick={deleteReview}
        />
      )}
    </div>
  );
};

export default ReviewCard;
