import { z } from "zod";

export const updateUserSchema = z.object({
    name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres"}).max(100).optional(),
    ddd: z.string().length(2).optional(),
    phone: z.string().min(8, { message: "Insira um número de telefone válido"}).max(9, { message: "Insira um número de telefone válido"}).optional(),
    bio: z.string().max(500, { message: "A biografia deve ter no máximo 500 caracteres"}).optional(),
})