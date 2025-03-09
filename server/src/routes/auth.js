import express from "express";
import { register } from "../controllers/registerUser.js";
import { login } from "../controllers/loginUser.js";
import { getLocalizacao } from "../controllers/CheckOpenOrder.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/getOpenOrders", getLocalizacao);

export default router;
