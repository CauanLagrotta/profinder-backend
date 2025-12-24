import { Request } from "express";
import { UserType } from "./user-type";

export interface ExtendedRequest extends Request {
    user?: UserType;
}