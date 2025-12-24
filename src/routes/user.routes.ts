import { Router } from "express";
import { getUserController } from "../controllers/user/get-user-controller/get-user.controller";
import { getUserPostsController } from "../controllers/user/get-user-posts-controller/get-user-posts.controller";
import { updateUserController } from "../controllers/user/update-user-controller/update-user.controller";
import { verifyJWT } from "../utils/jwt";
import { deleteUserController } from "../controllers/user/delete-user-controller/delete-user.controller";

export const userRoutes = Router();

userRoutes.get("/:id", getUserController);
userRoutes.put("/:id/update", verifyJWT, updateUserController);
userRoutes.get("/:id/posts", getUserPostsController);
userRoutes.delete("/:id/delete", verifyJWT, deleteUserController);