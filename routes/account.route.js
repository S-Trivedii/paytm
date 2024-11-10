import express from "express";
import { checkBalance } from "../controllers/account.controller.js";
import { transferMoney } from "../controllers/account.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/balance").get(isAuthenticated, checkBalance);
router.route("/transfer").post(isAuthenticated, transferMoney);

export default router;
