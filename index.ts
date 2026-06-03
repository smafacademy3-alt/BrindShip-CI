// src/routes/index.ts — Brand Ship CI

import { Router } from "express";
import * as auth from "../controllers/auth.controller";
import * as order from "../controllers/order.controller";
import * as store from "../controllers/store.controller";
import * as wallet from "../controllers/wallet.controller";
import { authenticate, requireRole } from "../middleware/auth.middleware";

const router = Router();

// ── Auth ─────────────────────────────────────────────────────────────────
router.post("/auth/register", auth.register);
router.post("/auth/login", auth.login);
router.get("/auth/profile", authenticate, auth.getProfile);

// ── Stores ───────────────────────────────────────────────────────────────
router.post("/stores", authenticate, requireRole("INFLUENCER"), store.createStore);
router.post("/stores/products", authenticate, requireRole("INFLUENCER"), store.addProductToStore);
router.get("/stores/:slug", store.getPublicStore); // Public

// ── Orders ───────────────────────────────────────────────────────────────
router.post("/orders", order.createOrder);             // Public — depuis boutique
router.post("/orders/complete", authenticate, requireRole("ADMIN", "SUPPLIER"), order.completeOrder);
router.post("/orders/cancel", authenticate, order.cancelOrder);

// ── Wallet ───────────────────────────────────────────────────────────────
router.get("/wallet/balance", authenticate, wallet.getWalletBalance);
router.get("/wallet/transactions", authenticate, wallet.getTransactionHistory);
router.post("/wallet/withdraw", authenticate, wallet.requestWithdrawal);

export default router;
