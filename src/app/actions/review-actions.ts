"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createReview(data: {
    propertyId: string;
    userId: string;
    rating: number;
    comment: string;
}) {
    try {
        const review = await db.review.create({
            data: {
                propertyId: data.propertyId,
                userId: data.userId,
                rating: data.rating,
                comment: data.comment,
            },
        });

        // Update property rating and review count
        const allReviews = await db.review.findMany({
            where: { propertyId: data.propertyId },
        });

        const reviewCount = allReviews.length;
        const rating = allReviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewCount;

        await db.property.update({
            where: { id: data.propertyId },
            data: {
                rating,
                reviewCount,
            },
        });

        revalidatePath(`/housing/${data.propertyId}`);
        return { success: true, data: review };
    } catch (error) {
        console.error("Failed to create review:", error);
        return { success: false, error: "Failed to create review" };
    }
}

export async function getReviewsByPropertyId(propertyId: string) {
    try {
        const reviews = await db.review.findMany({
            where: { propertyId },
            include: {
                user: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: true, data: reviews };
    } catch (error) {
        console.error("Failed to fetch reviews:", error);
        return { success: false, error: "Failed to fetch reviews" };
    }
}
