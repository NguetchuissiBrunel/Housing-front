import { PrismaClient, UserRole } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create users
    const landlord = await prisma.user.upsert({
        where: { email: 'jean.kamga@logement.cm' },
        update: {},
        create: {
            email: 'jean.kamga@logement.cm',
            name: 'Jean Kamga',
            role: UserRole.LANDLORD,
            phone: '+237 600 000 002',
            verified: true,
        },
    });

    const student = await prisma.user.upsert({
        where: { email: 'marie.ngo@student.cm' },
        update: {},
        create: {
            email: 'marie.ngo@student.cm',
            name: 'Marie Ngo',
            role: UserRole.STUDENT,
            verified: true,
        },
    });

    console.log('✅ Users created');

    // Create properties
    const properties = [
        {
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
            rating: 4.8,
            reviewCount: 24,
            ownerId: landlord.id,
        },
        {
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
            rating: 4.6,
            reviewCount: 18,
            ownerId: landlord.id,
        },
        {
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
            rating: 4.5,
            reviewCount: 12,
            ownerId: landlord.id,
        },
        {
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
            rating: 4.7,
            reviewCount: 15,
            ownerId: landlord.id,
        },
        {
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
            rating: 4.9,
            reviewCount: 28,
            ownerId: landlord.id,
        },
        {
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
            rating: 4.4,
            reviewCount: 9,
            ownerId: landlord.id,
        },
    ];

    // Clear existing data (optional, but good for clean seed)
    await prisma.review.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.message.deleteMany({});
    await prisma.conversation.deleteMany({});
    await prisma.property.deleteMany({});

    for (const property of properties) {
        await prisma.property.create({
            data: property,
        });
    }

    console.log('✅ Properties created');
    console.log('🎉 Database seeded successfully!');
}

main()
    .catch((e) => {
        console.error('❌ Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
