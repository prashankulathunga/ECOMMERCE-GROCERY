import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .json({ success: false, message: "Email and password are required" });
    }

    if (
      email === process.env.SELLER_EMAIL &&
      password === process.env.SELLER_PASSWORD
    ) {

        const token = jwt.sign({email}, process.env.SECRET_KEY, {
            expiresIn: "1d",
        });

      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({ success: true, message: "Login successfully" });
    } else {
      return res
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ success: false, message: "Internal server error"});
  }
};

export const checkAuth = async(req, res)=>{
    try {
        return res.status(200).json({success: true, message: "Authorized"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: "Internal server error"});
    }
}

export const logout = async(req, res)=>{
    try {
        res.clearCookie("sellerToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({success: true, message: "Logout successfully"});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: "Internal server error"});
    }
}