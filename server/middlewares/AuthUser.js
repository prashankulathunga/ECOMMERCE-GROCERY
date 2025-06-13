import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  console.log(token);

  try {
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    console.log(tokenDecode);
    if (tokenDecode) {
    console.log(tokenDecode);
      req.userId = tokenDecode.id;
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Internal server error"});
  }
};

export default authUser;
