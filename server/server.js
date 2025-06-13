import cookieParser from 'cookie-parser';
import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import connectDB from './configs/db.js';
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
import SellerRoute from "./routes/SellerRoute.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

await connectDB();

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