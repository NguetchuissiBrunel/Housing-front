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
export async function getBookingsByLandlord(landlordId: string) {
    try {
        const bookings = await db.booking.findMany({
            where: {
                property: {
                    ownerId: landlordId,
                },
            },
            include: {
                property: true,
                user: true,
            },
            orderBy: { createdAt: "desc" },
        });
        return { success: true, data: bookings };
    } catch (error) {
        console.error("Failed to fetch landlord bookings:", error);
        return { success: false, error: "Failed to fetch landlord bookings" };
    }
}

export async function cancelBooking(id: string, userId: string) {
    try {
        // Find the booking first to check ownership and status
        const booking = await db.booking.findUnique({
            where: { id },
        });

        if (!booking) {
            return { success: false, error: "Réservation non trouvée" };
        }

        if (booking.userId !== userId) {
            return { success: false, error: "Non autorisé" };
        }

        if (booking.status !== BookingStatus.PENDING) {
            return { success: false, error: "Seules les réservations en attente peuvent être annulées" };
        }

        await db.booking.delete({
            where: { id },
        });

        revalidatePath("/dashboard");
        revalidatePath("/landlord/dashboard");

        return { success: true };
    } catch (error) {
        console.error("Failed to cancel booking:", error);
        return { success: false, error: "Erreur lors de l'annulation" };
    }
}
