// Central type definitions for the application

export enum UserRole {
    STUDENT = 'STUDENT',
    LANDLORD = 'LANDLORD',
    ADMIN = 'ADMIN'
}

export enum BookingStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    phone?: string;
    verified?: boolean;
}

export interface Property {
    id: string;
    title: string;
    description: string;
    price: number;
    address: string;
    city: string;
    images: string[];
    features: string[];
    bedrooms: number;
    bathrooms: number;
    area: number;
    available: boolean;
    ownerId: string;
    rating: number;
    reviewCount: number;
    createdAt: string | Date;
}

export interface Booking {
    id: string;
    propertyId: string;
    userId: string;
    startDate: string | Date;
    endDate: string | Date;
    totalPrice: number;
    status: BookingStatus;
    createdAt: string | Date;
}

export interface Review {
    id: string;
    propertyId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string | Date;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    content: string;
    read: boolean;
    createdAt: string | Date;
}

export interface Conversation {
    id: string;
    propertyId: string;
    studentId: string;
    landlordId: string;
    lastMessage?: string;
    lastMessageTime: string | Date;
    createdAt: string | Date;
}
