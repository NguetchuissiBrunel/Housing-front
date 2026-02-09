"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { BookingStatus } from "@prisma/client";

export async function createBooking(data: {
    propertyId: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
}) {
    try {
        const booking = await db.booking.create({
            data: {
                propertyId: data.propertyId,
                userId: data.userId,
                startDate: data.startDate,
                endDate: data.endDate,
                totalPrice: data.totalPrice,
                status: BookingStatus.PENDING,
            },
        });

        revalidatePath("/profile");
        revalidatePath("/dashboard");
        return { success: true, data: booking };
    } catch (error) {
        console.error("Failed to create booking:", error);
        return { success: false, error: "Failed to create booking" };
    }
}

export async function getBookingsByUser(userId: string) {
    try {
        const bookings = await db.booking.findMany({
            where: { userId },
            include: {
                property: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: bookings };
    } catch (error) {
        console.error("Failed to fetch bookings:", error);
        return { success: false, error: "Failed to fetch bookings" };
    }
}

export async function updateBookingStatus(id: string, status: BookingStatus) {
    try {
        const booking = await db.booking.update({
            where: { id },
            data: { status },
        });
        revalidatePath("/dashboard");
        return { success: true, data: booking };
    } catch (error) {
        console.error("Failed to update booking status:", error);
        return { success: false, error: "Failed to update booking status" };
    }
}
