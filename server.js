import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middleware/errorhandler.js";
import contactRoutes from './routes/contactRoutes.js';
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./config/dbConnection.js";
dotenv.config();
connectDb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/contacts/api", contactRoutes);
app.use("/users/api", userRoutes);
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});