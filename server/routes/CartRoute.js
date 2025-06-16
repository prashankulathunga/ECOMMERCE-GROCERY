import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { updateCart } from "../controllers/CartController.js";

const router = express.Router();

router.post("/update", authUser, updateCart);

export default router;