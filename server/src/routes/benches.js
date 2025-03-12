import express from "express";
import { getUserBenches } from "../controllers/bench/getUserBenches.js";

const router = express.Router();

router.get("/getUserBenches:id", getUserBenches);

export default router;
