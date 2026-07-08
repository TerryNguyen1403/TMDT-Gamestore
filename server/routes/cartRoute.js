import express from "express";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  getCart,
  increaseQuantity,
  getTotalAmount,
} from "../controller/cartController.js";
import { verify } from "../middleware/authUser.js";

const router = express.Router();

router.get("/", verify, getCart);
router.post("/add", verify, addToCart);
router.patch("/increase", verify, increaseQuantity);
router.patch("/decrease", verify, decreaseQuantity);
router.delete("/delete", verify, deleteFromCart);
router.get("/total", verify, getTotalAmount);

export default router;
