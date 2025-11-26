import express from "express";
import { allUsers } from "../controller/adminController.js";
import { verify, adminOnly } from "../middleware/authUser.js";

const router = express.Router();

router.get("/all-users", verify, adminOnly, allUsers);

export default router;
