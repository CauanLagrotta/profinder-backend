import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { getUserByEmailService } from "../services/user/get-user.service";
import { ExtendedRequest } from "../types/extended-request";

export const createJWT = (email: string) => {
    return jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export const verifyJWT = (req: ExtendedRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json({ error: "Acesso não autorizado" });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        async (error, decoded: any) => {
            if(error) {
                return res.status(401).json({ error: "Acesso não autorizado" });
            }

            const user = await getUserByEmailService(decoded.email);
            if(!user) {
                return res.status(401).json({ error: "Acesso não autorizado" });
            }

            req.user = user;

            next();
        }
    );
}