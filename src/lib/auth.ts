"use client";

import { UserRole } from './mockData';

// Simulated current user (stored in localStorage)
const CURRENT_USER_KEY = 'logement_current_user';

export interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

// Get current logged-in user
export function getCurrentUser(): CurrentUser | null {
    if (typeof window === 'undefined') return null;

    const userStr = localStorage.getItem(CURRENT_USER_KEY);
    if (!userStr) return null;

    try {
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

// Set current user (login)
export function setCurrentUser(user: CurrentUser): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Clear current user (logout)
export function clearCurrentUser(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Check if user is logged in
export function isAuthenticated(): boolean {
    return getCurrentUser() !== null;
}

// Check if user is a landlord
export function isLandlord(): boolean {
    const user = getCurrentUser();
    return user?.role === UserRole.LANDLORD;
}

// Check if user is a student
export function isStudent(): boolean {
    const user = getCurrentUser();
    return user?.role === UserRole.STUDENT;
}

// Check if user is an admin
export function isAdmin(): boolean {
    const user = getCurrentUser();
    return user?.role === UserRole.ADMIN;
}

// Get user role
export function getUserRole(): UserRole | null {
    const user = getCurrentUser();
    return user?.role || null;
}

// Get dashboard URL based on role
export function getDashboardUrl(role: UserRole): string {
    switch (role) {
        case UserRole.LANDLORD:
            return '/landlord/dashboard';
        case UserRole.STUDENT:
            return '/dashboard';
        case UserRole.ADMIN:
            return '/admin/dashboard';
        default:
            return '/dashboard';
    }
}
