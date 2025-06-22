import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js";
import strip from "stripe";

export const placeOrderCOD = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    if (!address || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Address and items are required" });
    }

    // calculate amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res
      .status(200)
      .json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const placeOrderStripe = async (req, res) => {
  try {
    const userId = req.userId;
    const { items, address } = req.body;

    const { origin } = req.headers;

    if (!address || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Address and items are required" });
    }

    let productData = [];

    // calculate amount using Items
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    // strip gateway initialize

    const stripeInstance = new strip(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // create session

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/loader?next=my-orders`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
      },
    });

    return res.status(200).json({ success: true, url: session.url });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { paymentType: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { paymentType: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
