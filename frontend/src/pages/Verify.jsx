import axios from "axios";
import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { backend_url } from "../App";
import { ShopContext } from "../context/ShopContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const { navigate, clearCart } = useContext(ShopContext);
  const success = searchParams.get("success");

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post(backend_url + "/api/order/verify", {
          success,
        });

        if (response.data.success) {
          navigate("/orders");
          clearCart();
        }
      } catch (error) {
        navigate("/cart");
        toast.error(error.message);
      }
    };

    verifyUser();
  }, []);

  return <div></div>;
};

export default Verify;
