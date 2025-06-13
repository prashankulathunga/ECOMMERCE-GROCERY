import express from "express";
import {checkAuth, login, logout, register} from "../controllers/UserController.js";
import authUser from "../middlewares/AuthUser.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/is-auth', authUser, checkAuth);
router.get('/logout', authUser, logout);

export default router;