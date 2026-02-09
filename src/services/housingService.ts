"use client";

import { createProperty } from "@/app/actions/property-actions";

export interface CreateHousingData {
    title: string;
    type: string;
    description: string;
    address: string;
    city: string;
    rentPrice: number;
    universityDistanceMinutes: number;
    isFurnished: boolean;
}

export interface Housing {
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
    createdAt: Date;
}

class HousingService {
    async createHousing(data: CreateHousingData): Promise<Housing> {
        try {
            // Get current user from localStorage (mock auth)
            const userStr = localStorage.getItem('logement_current_user');
            const user = userStr ? JSON.parse(userStr) : null;

            if (!user) {
                throw new Error("Vous devez être connecté pour créer une annonce");
            }

            // Map the form data to property data
            const propertyData = {
                title: data.title,
                description: data.description,
                price: data.rentPrice,
                address: data.address,
                city: data.city,
                images: [], // Will be updated with uploadImages
                features: data.isFurnished ? ['Meublé'] : [],
                bedrooms: data.type === 'STUDIO' ? 1 : data.type === 'ROOM' ? 1 : 2,
                bathrooms: 1,
                area: data.type === 'STUDIO' ? 25 : data.type === 'ROOM' ? 15 : 45,
                available: true,
                ownerId: user.id,
            };

            const result = await createProperty(propertyData);

            if (!result.success || !result.data) {
                throw new Error(result.error || "Échec de la création du logement");
            }

            return result.data as Housing;
        } catch (error: any) {
            console.error("Error creating housing:", error);
            throw error;
        }
    }

    async uploadImages(housingId: string, files: File[]): Promise<string[]> {
        try {
            // For now, return placeholder images
            // In production, this would upload to a cloud service
            const placeholderImages = [
                '/images/analog-landscape-city-with-buildings.jpg',
                '/images/still-life-keys-new-home.jpg',
                '/images/new-home-keys-plan-table-with-defocused-couple.jpg',
            ];

            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return placeholderImages.slice(0, files.length);
        } catch (error) {
            console.error("Error uploading images:", error);
            throw new Error("Échec de l'upload des images");
        }
    }

    async getHousing(id: string): Promise<Housing | null> {
        // This would fetch from the database
        // For now, return null as we're using server actions
        return null;
    }

    async updateHousing(id: string, data: Partial<CreateHousingData>): Promise<Housing> {
        // This would update in the database
        throw new Error("Not implemented");
    }

    async deleteHousing(id: string): Promise<void> {
        // This would delete from the database
        throw new Error("Not implemented");
    }
}

export const housingService = new HousingService();
