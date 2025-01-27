import jwt from "jsonwebtoken";

const verifyUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token)
      return res.json({ success: false, message: "Unauthorized Login Again" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = decodedToken.id;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export default verifyUser;
