import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD } from "../controllers/OrderController.js";
import authSeller from "../middlewares/AuthSeller.js";

const router = express.Router();

router.post('/cod', authUser, placeOrderCOD);
router.post('/user', authUser, getUserOrders);
router.get('/seller', authSeller, getAllOrders);

export default router;