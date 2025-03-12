import express from "express";
import { getLocalizacao } from "../controllers/request/CheckOpenOrder.js";
import { updateRequest } from "../controllers/request/updateRequest.js";

const router = express.Router();

router.get("/getOpenOrders", getLocalizacao);
router.put("/updateRequest", updateRequest);

export default router;
