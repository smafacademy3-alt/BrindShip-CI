// src/app.ts — Brand Ship CI

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";

const app = express();

// ── Sécurité & middlewares ────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("combined"));
}

// ── Routes ────────────────────────────────────────────────────────────────
app.use("/api/v1", routes);

// ── Health check ──────────────────────────────────────────────────────────
app.get("/health", (_, res) => {
  res.json({ status: "OK", app: "Brand Ship CI", version: "1.0.0" });
});

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((_, res) => {
  res.status(404).json({ success: false, message: "Route introuvable." });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Brand Ship CI API — http://localhost:${PORT}`);
});

export default app;
