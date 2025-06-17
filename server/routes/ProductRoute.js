import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/AuthSeller.js";
import { addProduct, changeStoke, getProducts, productById } from "../controllers/ProductController.js";

const router = express.Router();

router.post('/add', upload.array("images"), authSeller, addProduct);
router.get('/list', getProducts);
router.get('/id', productById);
router.get('/stock', authSeller, changeStoke);

export default router;