import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { backend_url } from "../App";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backend_url + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        count += Number(cartItems[items][item]);
      }
    }

    return count;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.put(
          backend_url + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    if (products.length !== 0) {
      for (const items in cartItems) {
        const productInfo = products.find((item) => item._id === items);

        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * productInfo.price;
          }
        }
      }
    }
    return totalAmount;
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(backend_url + "/api/product/list");

      if (response.data.success) {
        setProducts(response.data.allProducts);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getUserCart = async () => {
    try {
      const response = await axios.get(backend_url + "/api/cart/list", {
        headers: { token },
      });

      if (response.data.success) {
        setCartItems(response.data.cartData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  useEffect(() => {
    getUserCart();
  }, [cartItems]);

  return (
    <ShopContext.Provider
      value={{
        currency,
        delivery_fee,
        products,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        token,
        setToken,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
