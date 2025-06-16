import cookieParser from 'cookie-parser';
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import connectDB from './configs/db.js';
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import SellerRoute from "./routes/SellerRoute.js";
import connectCloudinary from './configs/cloudinary.js';
import ProductRoute from "./routes/ProductRoute.js";
import CartRoute from "./routes/CartRoute.js";
import AddressRoute from "./routes/AddressRoute.js";
import OrderRoute from "./routes/OrderRoute.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

await connectDB();
await connectCloudinary();

// allow multiple origins
const allowedOrigins = ['http://localhost:5173']

// middleware configuration 
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: allowedOrigins,
    Credential: true
}));


app.get("/", (req, res)=>{
    res.send("API is Working");
})

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

 // router 
 app.use('/api/user', UserRoute);
 app.use('/api/seller', SellerRoute);
 app.use('/api/product', ProductRoute);
 app.use('/api/update', CartRoute);
 app.use('/api/address', AddressRoute);
 app.use('/api/order', OrderRoute);