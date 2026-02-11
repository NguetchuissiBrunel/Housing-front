"use client";

import Link from "next/link";
import { useState } from "react";
import { Star, MapPin, Bed, Bath, Maximize, Heart } from "lucide-react";
import { Card, CardImage, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { Property } from "@prisma/client";
import { formatPrice } from "@/lib/utils";
import { toggleFavorite } from "@/app/actions/favorite-actions";
import { toast } from "sonner";

interface PropertyCardProps {
    property: Property;
    currentUser?: any;
    isInitialFavorited?: boolean;
}

export default function PropertyCard({ property, currentUser, isInitialFavorited = false }: PropertyCardProps) {
    const [isFav, setIsFav] = useState(isInitialFavorited);
    const [isToggling, setIsToggling] = useState(false);

    const handleToggleFavorite = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            toast.error("Veuillez vous connecter pour ajouter des favoris");
            return;
        }

        setIsToggling(true);
        const newFavStatus = !isFav;
        setIsFav(newFavStatus); // Optimistic update

        try {
            const result = await toggleFavorite({
                userId: currentUser.id,
                propertyId: property.id
            });

            if (!result.success) {
                setIsFav(!newFavStatus); // Rollback
                toast.error("Erreur lors de la mise à jour des favoris");
            }
        } catch (error) {
            setIsFav(!newFavStatus); // Rollback
            toast.error("Une erreur s'est produite");
        } finally {
            setIsToggling(false);
        }
    };

    return (
        <Card hover className="group">
            <CardImage
                src={property.images[0]}
                alt={property.title}
                className="h-64"
            >
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg text-brand-primary text-xs font-bold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current" /> {property.rating}
                </div>

                <button
                    onClick={handleToggleFavorite}
                    disabled={isToggling}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isFav
                        ? 'bg-rose-500 text-white shadow-lg'
                        : 'bg-white/90 backdrop-blur text-slate-400 hover:text-rose-500 shadow-sm'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>

                {!property.available && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Badge variant="danger" className="text-sm px-4 py-2">Non disponible</Badge>
                    </div>
                )}
            </CardImage>

            <CardContent className="space-y-4">
                <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-brand-secondary/80 text-[10px] font-bold uppercase tracking-wider">
                            <MapPin className="w-3 h-3" /> {property.city}
                        </div>
                        <Badge variant="default" className="text-[9px] uppercase font-black tracking-widest bg-slate-100 text-slate-500 border-none px-2">
                            {property.type}
                        </Badge>
                    </div>
                    <CardTitle className="group-hover:text-brand-primary transition-colors">
                        {property.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                        {property.description}
                    </CardDescription>
                </CardHeader>

                {/* Property Features */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        <span>{property.bedrooms} ch.</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="w-4 h-4" />
                        <span>{property.bathrooms} sdb</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Maximize className="w-4 h-4" />
                        <span>{property.area}m²</span>
                    </div>
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2">
                    {property.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="default" className="text-[10px]">
                            {feature}
                        </Badge>
                    ))}
                    {property.features.length > 3 && (
                        <Badge variant="default" className="text-[10px]">
                            +{property.features.length - 3}
                        </Badge>
                    )}
                </div>

                <CardFooter>
                    <div className="text-2xl font-bold text-slate-900">
                        {formatPrice(property.price)} <span className="text-xs font-medium text-slate-400 uppercase ml-0.5">FCFA/mois</span>
                    </div>
                    <Link href={`/housing/${property.id}`}>
                        <Button variant="ghost" size="sm" className="text-brand-primary font-bold text-xs hover:bg-brand-primary/5">
                            Détails
                        </Button>
                    </Link>
                </CardFooter>
            </CardContent>
        </Card>
    );
}
