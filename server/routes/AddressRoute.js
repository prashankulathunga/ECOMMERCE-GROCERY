import express from "express";
import authUser from "../middlewares/AuthUser.js";
import { addAddress, getAddresses } from "../controllers/AddressController.js";

const router = express.Router();

router.post("/add", authUser, addAddress);
router.get("/get", authUser, getAddresses);

export default router;