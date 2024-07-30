import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorHandler.js";
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/dbConnection.js";
import cors from "cors";
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;
app.use(cors({
    origin : "https://contacts-frontend-oojs.onrender.com",
    methods : ["GET","POST","PUT","DELETE"]
}))
app.use(express.json());
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});