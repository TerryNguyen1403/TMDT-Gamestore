import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      _id: false,
      gameId: {
        type: Schema.Types.ObjectId,
        ref: "Game",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        default: 0,
      },
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
  voucher: {
    type: Schema.Types.ObjectId,
    ref: "Voucher",
    default: null,
  },
});

const Cart = new mongoose.model("Cart", cartSchema);

export default Cart;
