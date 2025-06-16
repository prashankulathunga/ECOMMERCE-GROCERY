import User from "../models/UserModel.js";

export const updateCart = async(req, res)=>{
    try {
        
        const userId = req.userId;
        const {cartItems} = req.body;

        await User.findByIdAndUpdate(userId, {cart: cartItems});

        return res.status(200).json({success: true, message: "Cart updated successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

