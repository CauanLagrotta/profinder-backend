export interface UserType {
    id: string;
    name: string;
    email: string;
    ddd: string | null;
    phone: string | null;
    avatarUrl: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    rating: number | null;
    locationId: string | null;
}