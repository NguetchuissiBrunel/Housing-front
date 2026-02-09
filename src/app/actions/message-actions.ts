"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function getConversations(userId: string) {
    try {
        const conversations = await db.conversation.findMany({
            where: {
                OR: [{ studentId: userId }, { landlordId: userId }],
            },
            include: {
                property: true,
                student: true,
                landlord: true,
                messages: {
                    orderBy: { createdAt: "desc" },
                    take: 1,
                },
            },
            orderBy: { lastMessageTime: "desc" },
        });
        return { success: true, data: conversations };
    } catch (error) {
        console.error("Failed to fetch conversations:", error);
        return { success: false, error: "Failed to fetch conversations" };
    }
}

export async function getMessages(conversationId: string) {
    try {
        const messages = await db.message.findMany({
            where: { conversationId },
            include: {
                sender: true,
            },
            orderBy: { createdAt: "asc" },
        });
        return { success: true, data: messages };
    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return { success: false, error: "Failed to fetch messages" };
    }
}

export async function sendMessage(data: {
    conversationId: string;
    senderId: string;
    content: string;
}) {
    try {
        const message = await db.message.create({
            data: {
                conversationId: data.conversationId,
                senderId: data.senderId,
                content: data.content,
            },
        });

        await db.conversation.update({
            where: { id: data.conversationId },
            data: {
                lastMessage: data.content,
                lastMessageTime: new Date(),
            },
        });

        revalidatePath(`/messages`);
        return { success: true, data: message };
    } catch (error) {
        console.error("Failed to send message:", error);
        return { success: false, error: "Failed to send message" };
    }
}

export async function startConversation(data: {
    propertyId: string;
    studentId: string;
    landlordId: string;
}) {
    try {
        // Check if conversation already exists
        let conversation = await db.conversation.findFirst({
            where: {
                propertyId: data.propertyId,
                studentId: data.studentId,
                landlordId: data.landlordId,
            },
        });

        if (!conversation) {
            conversation = await db.conversation.create({
                data: {
                    propertyId: data.propertyId,
                    studentId: data.studentId,
                    landlordId: data.landlordId,
                },
            });
        }

        revalidatePath("/messages");
        return { success: true, data: conversation };
    } catch (error) {
        console.error("Failed to start conversation:", error);
        return { success: false, error: "Failed to start conversation" };
    }
}
