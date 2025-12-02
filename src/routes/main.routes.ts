import { Router } from "express";
import { authRoutes } from "./auth.routes.";

export const mainRoutes = Router();

mainRoutes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

mainRoutes.use("/auth", authRoutes);