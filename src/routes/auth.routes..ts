import { Router } from "express";
import { signupController } from "../controllers/auth/signup-controller/signup.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);