import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";

export const placeOrderCOD = async(req, res)=>{
    try {
        
        const userId = req.userId;
        const {items, address} = req.body;

        if (!address || items.length === 0) {
            return res.status(400).json({success: false, message: "Address and items are required"});
        }

        // calculate amount using Items
        let amount = await items.reduce(async (acc, item)=>{
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"
        })

        return res.status(200).json({success: true, message: "Order placed successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getUserOrders = async(req, res)=>{
    try {

        const userId = req.userId;
        const orders = await Order.find({userId,
            $or: [{paymentType: "COD"}, {paymentType: true}],
        }).populate("items.product address").sort({createdAt: -1});

        return res.status(200).json({success: true, orders});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}

export const getAllOrders = async(req, res)=>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: "COD"}, {paymentType: true}],
        }).populate("items.product address").sort({createdAt: -1});
        return res.status(200).json({success: true, orders});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: "Internal server error"});
    }
}