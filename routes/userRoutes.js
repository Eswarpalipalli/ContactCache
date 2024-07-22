import express from "express";
import { currentUser, loginUser, registerUser } from "../controllers/userController.js";
import vadidateToken from "../middleware/validateToken.js";

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current",vadidateToken,currentUser);

export default router;