import express from "express";
import { register } from "../controllers/auth/registerUser.js";
import { login } from "../controllers/auth/loginUser.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;
