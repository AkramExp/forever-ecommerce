import jwt from "jsonwebtoken";

const verifyAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token)
      return res.json({ success: false, message: "Unauthorized Access" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Unauthorized Access" });
  }
};

export default verifyAdmin;
