import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;

  if (!sellerToken) {
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }

  try {

    const tokenDecode = jwt.verify(sellerToken, process.env.SECRET_KEY);
    if(tokenDecode.email === process.env.SELLER_EMAIL){
        next();
    }else{
        return res.status(401).json({ status: false, message: "Unauthorized" });
    }


  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Internal server error" });
  }
};

export default authSeller;