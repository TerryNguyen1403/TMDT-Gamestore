import mongoose, { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    gameId: { type: Schema.Types.ObjectId, ref: "Game", required: true },
    gameName: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [orderItemSchema], required: true, default: [] },
    status: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
