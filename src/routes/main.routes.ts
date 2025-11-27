import { Router } from "express";

export const mainRoutes = Router();

mainRoutes.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});
