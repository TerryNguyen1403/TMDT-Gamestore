import express from "express";
import {
  addToCart,
  getCart,
  increaseQuantity,
} from "../controller/cartController.js";
import { verify } from "../middleware/authUser.js";

const router = express.Router();

router.get("/", verify, getCart);
router.post("/add", verify, addToCart);
router.patch("/increase", verify, increaseQuantity);

export default router;
