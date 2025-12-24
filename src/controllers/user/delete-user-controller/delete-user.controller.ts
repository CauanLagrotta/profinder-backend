import { Request, Response } from "express";
import { deleteUserService } from "../../../services/user/delete-user.service";

export async function deleteUserController(req: Request, res: Response) {
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: "Id inválido ou não fornecido" });
    }

    try {
        await deleteUserService(userId);
        return res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar usuário", error });
    }
}