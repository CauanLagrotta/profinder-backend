import { Router } from "express";
import { signupController } from "../controllers/auth/signup-controller/signup.controller";
import { signinController } from "../controllers/auth/signin-controller/signin.controller";

export const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/signin", signinController);