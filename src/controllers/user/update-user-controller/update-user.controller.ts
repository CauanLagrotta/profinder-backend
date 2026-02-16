import { Response } from "express";
import { ExtendedRequest } from "../../../types/extended-request";
import { updateUserSchema } from "../../../schemas/update-user-schema";
import { updateUserService } from "../../../services/user/update-user.service";
import { uploadImage } from "../../../utils/upload";


export async function updateUserController(req: ExtendedRequest, res: Response) {
    const safeData = updateUserSchema.safeParse(req.body);

    if(!safeData.success) {
        return res.status(400).json({ errors: safeData.error });
    }

    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID é obrigatório" });
    }
    if (id !== req.user!.id) {
        return res.status(403).json({ message: "Acesso negado" });
    }

    let avatarUrl: string | undefined;

    if (req.file) {
        avatarUrl = await uploadImage(req.file.buffer)
    }

    if (!Object.keys(safeData.data).length && !req.file) {
        return res.status(400).json({ message: "Nenhum dado para atualizar" });
    }   

    try {
        const newUser = await updateUserService({
            userId: id,
            data: {
                ...safeData.data,
                avatarUrl,
            },
        });

        return res.status(200).json({ user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao atualizar usuário" });
    } 
}
