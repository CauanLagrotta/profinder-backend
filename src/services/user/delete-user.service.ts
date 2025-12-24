import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";

export async function deleteUserService(userId: string){
    const deletedUser =await db
        .delete(users)
        .where(eq(users.id, userId))
        .returning();

    if(deletedUser.length === 0) {
        throw new Error("Erro ao deletar usuário");
    }

    return { message: "Usuário deletado com sucesso" }
}