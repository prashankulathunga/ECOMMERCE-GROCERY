import express from "express";
import { checkAuth, login, logout } from "../controllers/SellerController.js";
import authSeller from "../middlewares/AuthSeller.js";

const router = express.Router();

router.post('/login', login);
router.get('/is-auth',authSeller, checkAuth);
router.get('/logout', authSeller, logout);

export default router;