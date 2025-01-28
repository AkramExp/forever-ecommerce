import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { backend_url } from "../App";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    cartItems,
    products,
    getCartAmount,
    token,
    delivery_fee,
    clearCart,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          const productInfo = structuredClone(
            products.find((item) => item._id === items)
          );

          if (productInfo) {
            productInfo.size = item;
            productInfo.quantity = cartItems[items][item];
            orderItems.push(productInfo);
          }
        }
      }

      const orderData = {
        items: orderItems,
        address: formData,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backend_url + "/api/order/place-cod",
            orderData,
            { headers: { token } }
          );

          if (response.data.success) {
            await clearCart();
            toast.success(response.data.message);
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col sm:flex-row justify-between gap-5 pt-4 sm:pt-14 min-h-[80vh] border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            value={formData.firstName}
            onChange={onChangeHandler}
            name="firstName"
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          name="email"
          placeholder="Email"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          name="street"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <div className="flex gap-3">
          <input
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            name="city"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            name="state"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="text"
            name="zipcode"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            name="country"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          value={formData.phone}
          onChange={onChangeHandler}
          type="number"
          name="phone"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHODS"} />
          <div className="flex flex-col lg:flex-row gap-3">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo} alt="" className="h-5 mx-4" />
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              className="bg-black text-white px-16 py-3 text-sm"
              type="submit"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
