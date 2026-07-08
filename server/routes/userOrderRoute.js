import express from "express";

import { verify } from "../middleware/authUser.js";
import { allOrders } from "../controller/userOrderController.js";

const router = express.Router();

router.get("/all", verify, allOrders);

export default router;
