import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from "../controllers/OrderController.js";
import authSeller from "../middlewares/AuthSeller.js";

const router = express.Router();

router.post('/cod', authUser, placeOrderCOD);
router.get('/user', authUser, getUserOrders);
router.get('/seller', authSeller, getAllOrders);
router.post('/stripe', authUser, placeOrderStripe);


export default router;