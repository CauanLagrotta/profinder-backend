import { Router } from "express";
import { getUserController } from "../controllers/user/get-user-controller/get-user.controller";
import { getUserPostsController } from "../controllers/user/get-user-posts-controller/get-user-posts-controller";

export const userRoutes = Router();

userRoutes.get("/:id", getUserController);
userRoutes.get("/:id/posts", getUserPostsController);