"use server";

import db from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const SESSION_COOKIE_NAME = "logement_session";

export async function login(formData: { email: string; password?: string }) {
    try {
        const user = await db.user.findUnique({
            where: { email: formData.email },
        });

        if (!user) {
            return { success: false, error: "Utilisateur non trouvé" };
        }

        // For now, we accept any password since we haven't implemented hashing yet
        // In a real app, use bcrypt.compare(formData.password, user.passwordHash)

        const sessionData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        revalidatePath("/");
        return { success: true, data: sessionData };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error: "Erreur lors de la connexion" };
    }
}

export async function register(formData: {
    email: string;
    name: string;
    role: "STUDENT" | "LANDLORD";
    phone?: string;
    password?: string;
}) {
    try {
        const existingUser = await db.user.findUnique({
            where: { email: formData.email },
        });

        if (existingUser) {
            return { success: false, error: "Cet email est déjà utilisé" };
        }

        const user = await db.user.create({
            data: {
                email: formData.email,
                name: formData.name,
                role: formData.role,
                phone: formData.phone,
                verified: true, // Auto-verify for demo/dev
            },
        });

        const sessionData = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };

        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: "/",
        });

        revalidatePath("/");
        return { success: true, data: sessionData };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error: "Erreur lors de l'inscription" };
    }
}

export async function logout() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(SESSION_COOKIE_NAME);
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: "Erreur lors de la déconnexion" };
    }
}

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(SESSION_COOKIE_NAME);
        if (!session) return null;
        return JSON.parse(session.value);
    } catch {
        return null;
    }
}
export async function updateProfile(data: { name: string; phone?: string }) {
    try {
        const session = await getSession();
        if (!session) {
            return { success: false, error: "Non autorisé" };
        }

        const updatedUser = await db.user.update({
            where: { id: session.id },
            data: {
                name: data.name,
                phone: data.phone,
            },
        });

        // Update the session cookie with the new name
        const sessionData = {
            ...session,
            name: updatedUser.name,
        };

        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        revalidatePath("/");
        revalidatePath("/dashboard");
        revalidatePath("/landlord/dashboard");
        revalidatePath("/profile");

        return { success: true, data: sessionData };
    } catch (error) {
        console.error("Profile update error:", error);
        return { success: false, error: "Erreur lors de la mise à jour du profil" };
    }
}
