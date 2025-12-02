import { hash } from "bcryptjs";
import { drizzle } from "drizzle-orm/singlestore";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import { EmailAlreadyExistsError } from "../../errors/email-already-exists.error";

interface SignupUserProps {
    name: string;
    email: string;
    password: string;
    ddd: string;
    phone: string;
    bio?: string;
}

export async function signupService(
    { name, email, password, ddd, phone, bio }: SignupUserProps
) {
    const hashedPassword = await hash(password, 6);

    const emailAlreadyExists = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (emailAlreadyExists) {
        throw new EmailAlreadyExistsError();
    }

    const user = await db
    .insert(users)
    .values({
        name,
        email,
        password: hashedPassword,
        ddd,
        phone,
        bio,
    })
    .returning();

    return user;
}