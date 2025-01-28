import User from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser)
      return res.json({ success: false, message: "User Doesn't exists" });

    const cartData = findUser.cartData;

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

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser)
      return res.json({ success: false, message: "User Doesn't exists" });

    const cartData = findUser.cartData;

    cartData[itemId][size] = quantity;

    await User.findByIdAndUpdate(userId, { cartData });

    res.json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser)
      return res.json({ success: false, message: "User Doesn't exists" });

    const cartData = findUser.cartData;

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const findUser = await User.findById(userId);

    if (!findUser)
      return res.json({ success: false, message: "User Doesn't exists" });

    await User.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Cart Cleared" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
