"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(data: { userId: string; propertyId: string }) {
    try {
        const existing = await db.favorite.findUnique({
            where: {
                userId_propertyId: {
                    userId: data.userId,
                    propertyId: data.propertyId,
                },
            },
        });

        if (existing) {
            await db.favorite.delete({
                where: { id: existing.id },
            });
            revalidatePath(`/housing/${data.propertyId}`);
            revalidatePath("/dashboard");
            return { success: true, action: "removed" };
        } else {
            await db.favorite.create({
                data: {
                    userId: data.userId,
                    propertyId: data.propertyId,
                },
            });
            revalidatePath(`/housing/${data.propertyId}`);
            revalidatePath("/dashboard");
            return { success: true, action: "added" };
        }
    } catch (error) {
        console.error("Toggle favorite error:", error);
        return { success: false, error: "Failed to toggle favorite" };
    }
}

export async function getFavoritesByUser(userId: string) {
    try {
        const favorites = await db.favorite.findMany({
            where: { userId },
            include: {
                property: {
                    include: {
                        owner: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: favorites.map(f => f.property) };
    } catch (error) {
        console.error("Fetch favorites error:", error);
        return { success: false, error: "Failed to fetch favorites" };
    }
}

export async function isFavorited(userId: string, propertyId: string) {
    try {
        const favorite = await db.favorite.findUnique({
            where: {
                userId_propertyId: {
                    userId,
                    propertyId,
                },
            },
        });
        return !!favorite;
    } catch {
        return false;
    }
}
