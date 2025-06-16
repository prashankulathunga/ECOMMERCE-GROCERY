import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "product" },
        quantity: { type: Number, required: true },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "address" },
    status: { type: String, default: "Order Placed" },
    paymentType: { type: String, required: true },
    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.models.order || mongoose.model("order", OrderSchema);

export default Order;
