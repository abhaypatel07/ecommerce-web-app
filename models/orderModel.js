import mongoose from "mongoose";

// aa niche samajvu products ma array of objects aavse to ema object kevo hase te describe karyu 6

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Product",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["Not process", "Processing", "Shipped", "Deliverd", "Cancel"],
      default: "Not process",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
