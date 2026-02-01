"use client";

import { useState } from "react";
import {
    MapPin, Bed, Bath, Maximize, Share2, Heart, ArrowLeft,
    CheckCircle2, UserCircle2, MessageSquare, Phone,
    Info, Star, Home, Calendar
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getPropertyById, getReviewsByPropertyId, getUserById, mockReviews } from "@/lib/mockData";
import { formatPrice, formatDate } from "@/lib/utils";

export default function HousingDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const property = getPropertyById(id);
    const [activeImage, setActiveImage] = useState(0);

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-slate-50 p-6 text-center pt-32">
                <div className="w-32 h-32 bg-white rounded-[40px] shadow-xl flex items-center justify-center text-slate-200">
                    <Info className="w-16 h-16" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Logement introuvable</h1>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto text-lg">
                        Il semblerait que ce logement n'existe plus ou ait été retiré.
                    </p>
                </div>
                <Link href="/search">
                    <Button variant="primary" className="rounded-2xl px-12 py-4 font-bold">
                        Retour aux offres
                    </Button>
                </Link>
            </div>
        );
    }

    const owner = getUserById(property.ownerId);
    const reviews = getReviewsByPropertyId(property.id);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-white">
            <div className="container">
                {/* Back and Actions */}
                <div className="flex items-center justify-between mb-10">
                    <Link href="/search" className="inline-flex items-center gap-3 text-slate-500 hover:text-brand-primary font-bold transition-all group px-4 py-3 hover:bg-slate-50 rounded-2xl">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="uppercase tracking-wider text-xs">Retour</span>
                    </Link>
                    <div className="flex gap-3">
                        <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-pink-500 transition-all border border-slate-100 hover:shadow-lg active:scale-90">
                            <Heart className="w-5 h-5" />
                        </button>
                        <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-brand-primary transition-all border border-slate-100 hover:shadow-lg active:scale-90">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Image Gallery */}
                        <div className="space-y-6">
                            <div className="aspect-[16/9] w-full rounded-[40px] overflow-hidden bg-slate-100 shadow-2xl relative group">
                                <img
                                    src={property.images[activeImage]}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6 flex gap-3">
                                    <Badge variant="success" className="text-xs px-4 py-2 shadow-lg">
                                        VÉRIFIÉ
                                    </Badge>
                                    <Badge variant="primary" className="text-xs px-4 py-2 shadow-lg">
                                        DISPONIBLE
                                    </Badge>
                                </div>
                            </div>
                            {property.images.length > 1 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {property.images.map((img, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setActiveImage(idx)}
                                            className={`aspect-video rounded-2xl overflow-hidden border-4 transition-all duration-300 hover:scale-105 ${activeImage === idx ? "border-brand-primary shadow-xl" : "border-transparent opacity-60 hover:opacity-100"
                                                }`}
                                        >
                                            <img src={img} alt={`${property.title} ${idx + 1}`} className="w-full h-full object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Property Info */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-secondary font-bold uppercase tracking-wider text-xs">
                                    <MapPin className="w-4 h-4" /> {property.address}, {property.city}
                                </div>
                                <h1 className="text-5xl font-bold text-slate-900 tracking-tight leading-tight">
                                    {property.title}
                                </h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-lg">{property.rating}</span>
                                    </div>
                                    <span className="text-slate-400">•</span>
                                    <span className="text-slate-600 font-medium">{property.reviewCount} avis</span>
                                </div>
                            </div>

                            {/* Property Stats */}
                            <div className="grid grid-cols-3 gap-6">
                                {[
                                    { label: 'Chambres', value: property.bedrooms, icon: Bed },
                                    { label: 'Salles de bain', value: property.bathrooms, icon: Bath },
                                    { label: 'Surface', value: `${property.area}m²`, icon: Maximize },
                                ].map((stat, i) => (
                                    <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                                        <stat.icon className="w-8 h-8 text-brand-primary mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Description */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                        <Info className="w-5 h-5" />
                                    </div>
                                    À propos du bien
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg border-l-4 border-brand-primary/20 pl-6 py-2">
                                    {property.description}
                                </p>
                            </div>

                            {/* Amenities */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-slate-900">Équipements & Services</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {property.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-200 hover:border-brand-primary/30 hover:shadow-soft transition-all">
                                            <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                                                <CheckCircle2 className="w-6 h-6" />
                                            </div>
                                            <span className="font-semibold text-slate-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Reviews */}
                            {reviews.length > 0 && (
                                <div className="pt-8 border-t border-slate-200 space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-900">Avis des locataires</h2>
                                    <div className="space-y-4">
                                        {reviews.map((review) => {
                                            const reviewer = getUserById(review.userId);
                                            return (
                                                <div key={review.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">
                                                                {reviewer?.name.charAt(0) || 'U'}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-slate-900">{reviewer?.name || 'Utilisateur'}</div>
                                                                <div className="text-xs text-slate-400">{formatDate(review.createdAt)}</div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="text-slate-600 leading-relaxed">{review.comment}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Booking Sidebar */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                        {/* Price Card */}
                        <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-[40px] p-8 text-white space-y-6 shadow-2xl">
                            <div className="space-y-2">
                                <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Prix mensuel</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-bold">{formatPrice(property.price)}</span>
                                    <span className="text-sm font-bold text-white/80">FCFA</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                                    <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Caution</div>
                                    <div className="font-bold text-lg">1 mois de loyer</div>
                                </div>
                                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                                    <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-1">Charges incluses</div>
                                    <div className="font-bold text-lg flex items-center gap-2">
                                        Eau & Wi-Fi <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    </div>
                                </div>
                            </div>

                            <Button variant="secondary" fullWidth size="lg" className="h-16 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-xl bg-white text-brand-primary hover:bg-slate-50">
                                Réserver maintenant
                            </Button>

                            <p className="text-center text-xs font-bold text-white/40 uppercase tracking-wider">
                                Paiement sécurisé
                            </p>
                        </div>

                        {/* Owner Card */}
                        <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-soft space-y-6">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propriétaire</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-brand-primary relative">
                                    <UserCircle2 className="w-10 h-10" />
                                    <div className="absolute -bottom-1 -right-1 bg-brand-secondary text-white p-1.5 rounded-xl border-4 border-white">
                                        <CheckCircle2 className="w-3 h-3" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-900 text-xl">{owner?.name || 'Propriétaire'}</div>
                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hôte vérifié</div>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Button variant="primary" fullWidth className="rounded-2xl h-14 font-bold text-xs uppercase tracking-wider gap-2">
                                    <MessageSquare className="w-4 h-4" /> Envoyer un message
                                </Button>
                                <Button variant="outline" fullWidth className="rounded-2xl h-14 bg-slate-50 border-transparent text-slate-600 font-bold text-xs uppercase tracking-wider gap-2 hover:bg-slate-100">
                                    <Phone className="w-4 h-4" /> Voir le contact
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
