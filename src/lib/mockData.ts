// Mock Data for Housing Platform

// Types
export enum UserRole {
    STUDENT = 'STUDENT',
    LANDLORD = 'LANDLORD',
    ADMIN = 'ADMIN'
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
    area: number; // in m²
    available: boolean;
    ownerId: string;
    rating: number;
    reviewCount: number;
    createdAt: string;
}

export interface Booking {
    id: string;
    propertyId: string;
    userId: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
    createdAt: string;
}

export interface Review {
    id: string;
    propertyId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderName: string;
    content: string;
    timestamp: string;
    read: boolean;
}

export interface Conversation {
    id: string;
    propertyId: string;
    propertyTitle: string;
    propertyImage: string;
    studentId: string;
    studentName: string;
    landlordId: string;
    landlordName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

// Mock Users
export const mockUsers: User[] = [
    {
        id: '1',
        email: 'admin@studenthousing.cm',
        name: 'Admin User',
        role: UserRole.ADMIN,
        verified: true
    },
    {
        id: '2',
        email: 'jean.kamga@logement.cm',
        name: 'Jean Kamga',
        role: UserRole.LANDLORD,
        phone: '+237 600 000 002',
        verified: true
    },
    {
        id: '3',
        email: 'marie.ngo@student.cm',
        name: 'Marie Ngo',
        role: UserRole.STUDENT,
        verified: true
    },
];

// Mock Properties
export const mockProperties: Property[] = [
    {
        id: '1',
        title: 'Résidence Étudiante Elite',
        description: 'Magnifique studio meublé situé à 5 minutes de l\'Université de Yaoundé I. Entièrement équipé avec Wi-Fi haut débit, cuisine moderne, et salle de bain privée. Idéal pour étudiants sérieux.',
        price: 75000,
        address: 'Quartier Melen',
        city: 'Yaoundé',
        images: ['/images/analog-landscape-city-with-buildings.jpg', '/images/still-life-keys-new-home.jpg'],
        features: ['Wi-Fi', 'Meublé', 'Cuisine équipée', 'Salle de bain privée', 'Sécurité 24/7', 'Parking'],
        bedrooms: 1,
        bathrooms: 1,
        area: 25,
        available: true,
        ownerId: '2',
        rating: 4.8,
        reviewCount: 24,
        createdAt: '2024-01-15',
    },
    {
        id: '2',
        title: 'Appartement Moderne Ngoa-Ekelle',
        description: 'Spacieux appartement 2 chambres dans un quartier calme et sécurisé. Proche des commerces et transports. Parfait pour colocation étudiante.',
        price: 120000,
        address: 'Ngoa-Ekelle',
        city: 'Yaoundé',
        images: ['/images/new-home-keys-plan-table-with-defocused-couple.jpg', '/images/analog-landscape-city-with-buildings.jpg'],
        features: ['Wi-Fi', 'Meublé', '2 Chambres', 'Balcon', 'Eau courante', 'Électricité stable'],
        bedrooms: 2,
        bathrooms: 1,
        area: 45,
        available: true,
        ownerId: '2',
        rating: 4.6,
        reviewCount: 18,
        createdAt: '2024-01-20',
    },
    {
        id: '3',
        title: 'Studio Confort Essos',
        description: 'Studio bien agencé dans le quartier Essos. Environnement calme, idéal pour les études. Accès facile aux universités et centres commerciaux.',
        price: 65000,
        address: 'Essos',
        city: 'Yaoundé',
        images: ['/images/still-life-keys-new-home.jpg', '/images/new-home-keys-plan-table-with-defocused-couple.jpg'],
        features: ['Wi-Fi', 'Meublé', 'Climatisation', 'Cuisine', 'Sécurité'],
        bedrooms: 1,
        bathrooms: 1,
        area: 22,
        available: true,
        ownerId: '2',
        rating: 4.5,
        reviewCount: 12,
        createdAt: '2024-02-01',
    },
    {
        id: '4',
        title: 'Chambre Étudiante Bastos',
        description: 'Chambre meublée dans résidence sécurisée à Bastos. Quartier huppé et calme. Parfait pour étudiants recherchant confort et tranquillité.',
        price: 85000,
        address: 'Bastos',
        city: 'Yaoundé',
        images: ['/images/analog-landscape-city-with-buildings.jpg', '/images/still-life-keys-new-home.jpg'],
        features: ['Wi-Fi', 'Meublé', 'Climatisation', 'Salle de bain partagée', 'Sécurité 24/7', 'Gardien'],
        bedrooms: 1,
        bathrooms: 1,
        area: 18,
        available: true,
        ownerId: '2',
        rating: 4.7,
        reviewCount: 15,
        createdAt: '2024-01-25',
    },
    {
        id: '5',
        title: 'Appartement 3 Pièces Omnisport',
        description: 'Grand appartement 3 pièces près du stade Omnisport. Idéal pour colocation de 3-4 étudiants. Spacieux et bien éclairé.',
        price: 150000,
        address: 'Omnisport',
        city: 'Yaoundé',
        images: ['/images/new-home-keys-plan-table-with-defocused-couple.jpg', '/images/analog-landscape-city-with-buildings.jpg'],
        features: ['Wi-Fi', 'Meublé', '3 Chambres', 'Grand salon', 'Cuisine équipée', 'Parking'],
        bedrooms: 3,
        bathrooms: 2,
        area: 70,
        available: true,
        ownerId: '2',
        rating: 4.9,
        reviewCount: 28,
        createdAt: '2024-01-10',
    },
    {
        id: '6',
        title: 'Studio Moderne Kondengui',
        description: 'Studio récemment rénové à Kondengui. Proche de l\'université. Équipements neufs et modernes.',
        price: 70000,
        address: 'Kondengui',
        city: 'Yaoundé',
        images: ['/images/still-life-keys-new-home.jpg', '/images/new-home-keys-plan-table-with-defocused-couple.jpg'],
        features: ['Wi-Fi', 'Meublé', 'Neuf', 'Cuisine moderne', 'Salle de bain privée'],
        bedrooms: 1,
        bathrooms: 1,
        area: 24,
        available: true,
        ownerId: '2',
        rating: 4.4,
        reviewCount: 9,
        createdAt: '2024-02-05',
    },
];

// Mock Bookings
export const mockBookings: Booking[] = [
    {
        id: '1',
        propertyId: '1',
        userId: '3',
        startDate: '2024-03-01',
        endDate: '2024-08-31',
        totalPrice: 450000,
        status: 'CONFIRMED',
        createdAt: '2024-02-10',
    },
    {
        id: '2',
        propertyId: '3',
        userId: '3',
        startDate: '2024-02-15',
        endDate: '2024-07-15',
        totalPrice: 325000,
        status: 'PENDING',
        createdAt: '2024-02-12',
    },
];

// Mock Reviews
export const mockReviews: Review[] = [
    {
        id: '1',
        propertyId: '1',
        userId: '3',
        rating: 5,
        comment: 'Excellent logement ! Très propre et bien situé. Le propriétaire est très réactif. Je recommande vivement.',
        createdAt: '2024-02-01',
    },
    {
        id: '2',
        propertyId: '1',
        userId: '3',
        rating: 4,
        comment: 'Bon rapport qualité-prix. Quelques petits détails à améliorer mais dans l\'ensemble très satisfait.',
        createdAt: '2024-01-28',
    },
    {
        id: '3',
        propertyId: '2',
        userId: '3',
        rating: 5,
        comment: 'Parfait pour une colocation ! Spacieux et bien équipé.',
        createdAt: '2024-02-05',
    },
    {
        id: '4',
        propertyId: '5',
        userId: '3',
        rating: 5,
        comment: 'Magnifique appartement ! Nous sommes 4 colocataires et nous avons largement assez d\'espace.',
        createdAt: '2024-01-30',
    },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
    {
        id: 'conv-1',
        propertyId: '1',
        propertyTitle: 'Résidence Étudiante Elite',
        propertyImage: '/images/analog-landscape-city-with-buildings.jpg',
        studentId: '3',
        studentName: 'Marie Ngo',
        landlordId: '2',
        landlordName: 'Jean Kamga',
        lastMessage: 'Parfait, à samedi alors !',
        lastMessageTime: '2024-02-15T14:30:00',
        unreadCount: 2,
    },
    {
        id: 'conv-2',
        propertyId: '3',
        propertyTitle: 'Studio Confort Essos',
        propertyImage: '/images/still-life-keys-new-home.jpg',
        studentId: '3',
        studentName: 'Marie Ngo',
        landlordId: '2',
        landlordName: 'Jean Kamga',
        lastMessage: 'Merci pour les informations !',
        lastMessageTime: '2024-02-14T10:15:00',
        unreadCount: 0,
    },
];

// Mock Messages
export const mockMessages: Message[] = [
    {
        id: 'msg-1',
        conversationId: 'conv-1',
        senderId: '3',
        senderName: 'Marie Ngo',
        content: 'Bonjour, je suis intéressée par votre logement. Est-il toujours disponible ?',
        timestamp: '2024-02-15T10:00:00',
        read: true,
    },
    {
        id: 'msg-2',
        conversationId: 'conv-1',
        senderId: '2',
        senderName: 'Jean Kamga',
        content: 'Bonjour Marie ! Oui, le logement est toujours disponible. Vous pouvez venir le visiter quand vous voulez.',
        timestamp: '2024-02-15T10:30:00',
        read: true,
    },
    {
        id: 'msg-3',
        conversationId: 'conv-1',
        senderId: '3',
        senderName: 'Marie Ngo',
        content: 'Parfait ! Serait-il possible de le visiter ce samedi après-midi ?',
        timestamp: '2024-02-15T11:00:00',
        read: true,
    },
    {
        id: 'msg-4',
        conversationId: 'conv-1',
        senderId: '2',
        senderName: 'Jean Kamga',
        content: 'Oui, samedi à 14h ça vous convient ?',
        timestamp: '2024-02-15T11:15:00',
        read: false,
    },
    {
        id: 'msg-5',
        conversationId: 'conv-1',
        senderId: '3',
        senderName: 'Marie Ngo',
        content: 'Parfait, à samedi alors !',
        timestamp: '2024-02-15T14:30:00',
        read: false,
    },
    {
        id: 'msg-6',
        conversationId: 'conv-2',
        senderId: '3',
        senderName: 'Marie Ngo',
        content: 'Bonjour, quel est le montant de la caution pour ce studio ?',
        timestamp: '2024-02-14T09:00:00',
        read: true,
    },
    {
        id: 'msg-7',
        conversationId: 'conv-2',
        senderId: '2',
        senderName: 'Jean Kamga',
        content: 'Bonjour ! La caution est de 130 000 FCFA (2 mois de loyer).',
        timestamp: '2024-02-14T09:30:00',
        read: true,
    },
    {
        id: 'msg-8',
        conversationId: 'conv-2',
        senderId: '3',
        senderName: 'Marie Ngo',
        content: 'Merci pour les informations !',
        timestamp: '2024-02-14T10:15:00',
        read: true,
    },
];



// Helper functions
export const getPropertyById = (id: string): Property | undefined => {
    return mockProperties.find(p => p.id === id);
};

export const getPropertiesByCity = (city: string): Property[] => {
    return mockProperties.filter(p => p.city.toLowerCase().includes(city.toLowerCase()));
};

export const getReviewsByPropertyId = (propertyId: string): Review[] => {
    return mockReviews.filter(r => r.propertyId === propertyId);
};

export const getUserById = (id: string): User | undefined => {
    return mockUsers.find(u => u.id === id);
};

export const getBookingsByUserId = (userId: string): Booking[] => {
    return mockBookings.filter(b => b.userId === userId);
};

export const getConversationsByUserId = (userId: string): Conversation[] => {
    return mockConversations.filter(c => c.studentId === userId || c.landlordId === userId);
};

export const getMessagesByConversationId = (conversationId: string): Message[] => {
    return mockMessages.filter(m => m.conversationId === conversationId);
};

export const getUnreadCount = (userId: string): number => {
    const conversations = getConversationsByUserId(userId);
    return conversations.reduce((total, conv) => {
        const isStudent = conv.studentId === userId;
        return total + (isStudent ? conv.unreadCount : 0);
    }, 0);
};
