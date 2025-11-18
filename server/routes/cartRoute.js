import express from "express";
import { addToCart, getCart } from "../controller/cartController.js";
import { verify } from "../middleware/authUser.js";

const router = express.Router();

router.get("/", verify, getCart);
router.post("/add", verify, addToCart);

export default router;
