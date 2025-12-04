import { eq } from "drizzle-orm";
import { db } from "../../db";
import { posts } from "../../db/schema";

export async function getUserPostsService(userId: string) {
    const userPosts = await db.query.posts.findMany({
        where: eq(posts.userId, userId),
        columns: {
            id: true,
            title: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
        },
        with: {
            images: {
                columns: {
                    url: true,
                },
            },
        },
    });
        

    return userPosts;
}