import User from "../models/user.model";

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
