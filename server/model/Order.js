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
    status: { type: Number, default: 0, enum: [0, 1, 2, 3, 4] },
    totalAmount: { type: Number, required: true, min: 0 },
    // Giữ lại created_at và updated_at để tương thích với dữ liệu cũ
    created_at: { type: Date },
    updated_at: { type: Date },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// Middleware để xử lý dữ liệu cũ
orderSchema.pre("save", function (next) {
  const now = new Date();
  if (!this.created_at) {
    this.created_at = now;
  }
  if (!this.updated_at) {
    this.updated_at = now;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
