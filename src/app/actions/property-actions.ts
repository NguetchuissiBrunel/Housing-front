"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getProperties() {
    try {
        const properties = await db.property.findMany({
            include: {
                owner: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: true, data: properties };
    } catch (error) {
        console.error("Failed to fetch properties:", error);
        return { success: false, error: "Failed to fetch properties" };
    }
}

export async function getPropertiesByLandlord(ownerId: string) {
    try {
        const properties = await db.property.findMany({
            where: { ownerId },
            include: {
                owner: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: true, data: properties };
    } catch (error) {
        console.error("Failed to fetch landlord properties:", error);
        return { success: false, error: "Failed to fetch landlord properties" };
    }
}

export async function getPropertyById(id: string) {
    try {
        const property = await db.property.findUnique({
            where: { id },
            include: {
                owner: true,
                reviews: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdAt: "desc",
                    },
                },
            },
        });
        return { success: true, data: property };
    } catch (error) {
        console.error("Failed to fetch property:", error);
        return { success: false, error: "Failed to fetch property" };
    }
}

export async function createProperty(data: any) {
    try {
        const property = await db.property.create({
            data: {
                ...data,
            },
        });
        revalidatePath("/search");
        revalidatePath("/housing");
        return { success: true, data: property };
    } catch (error) {
        console.error("Failed to create property:", error);
        return { success: false, error: "Failed to create property" };
    }
}

export async function updateProperty(id: string, data: any) {
    try {
        const property = await db.property.update({
            where: { id },
            data: {
                ...data,
            },
        });
        revalidatePath(`/housing/${id}`);
        revalidatePath("/search");
        revalidatePath("/landlord/dashboard");
        return { success: true, data: property };
    } catch (error) {
        console.error("Failed to update property:", error);
        return { success: false, error: "Failed to update property" };
    }
}

export async function deleteProperty(id: string) {
    try {
        await db.property.delete({
            where: { id },
        });
        revalidatePath("/search");
        revalidatePath("/landlord/dashboard");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete property:", error);
        return { success: false, error: "Failed to delete property" };
    }
}
