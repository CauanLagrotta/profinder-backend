import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { InvalidCredentialsError } from "../../errors/invalid-credentials.error";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

interface signinServiceProps {
    email: string;
    password: string;
}

export async function signinService({ email, password }: signinServiceProps) {
    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        throw new InvalidCredentialsError();
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
        throw new InvalidCredentialsError();
    }

    const token = jwt.sign(email, process.env.JWT_SECRET as string);

    return { user, token };
}