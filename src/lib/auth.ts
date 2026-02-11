import { UserRole } from '@prisma/client';

// Cookie name for server-side session
const SESSION_COOKIE_NAME = 'logement_session';
const CURRENT_USER_KEY = 'logement_current_user';

export interface CurrentUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

// Get current logged-in user (works in both Client and Server components)
export function getCurrentUser(): CurrentUser | null {
    // Client-side: check localStorage first for immediate UI
    if (typeof window !== 'undefined') {
        const userStr = localStorage.getItem(CURRENT_USER_KEY);
        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch {
                return null;
            }
        }
    }

    // On server or if localStorage is empty, we'd ideally check cookies
    // Note: next/headers cookies() can only be used in server components/actions
    // This function will primarily serve client-side needs or be passed data from server
    return null;
}

// Set current user (syncs with localStorage for client-side persistence)
export function setCurrentUser(user: CurrentUser): void {
    if (typeof window !== 'undefined') {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    }
}

// Clear current user
export function clearCurrentUser(): void {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
}

// ... existing helper functions ...
export function isAuthenticated(): boolean {
    return getCurrentUser() !== null;
}

export function isLandlord(): boolean {
    const user = getCurrentUser();
    return user?.role === UserRole.LANDLORD;
}

export function isStudent(): boolean {
    const user = getCurrentUser();
    return user?.role === UserRole.STUDENT;
}


export function getUserRole(): UserRole | null {
    const user = getCurrentUser();
    return user?.role || null;
}

export function getDashboardUrl(role: UserRole): string {
    switch (role) {
        case UserRole.LANDLORD:
            return '/landlord/dashboard';
        case UserRole.STUDENT:
            return '/dashboard';
        default:
            return '/dashboard';
    }
}
