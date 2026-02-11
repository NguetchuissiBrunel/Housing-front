import {
    MapPin, Bed, Bath, Maximize, Share2, Heart, ArrowLeft,
    CheckCircle2, UserCircle2, MessageSquare, Phone,
    Info, Star
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { getPropertyById } from "@/app/actions/property-actions";
import { getSession } from "@/app/actions/auth-actions";
import { formatPrice, formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import ImageGallery from "./ImageGallery";
import PropertyActions from "./PropertyActions";
import ReviewForm from "./ReviewForm";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function HousingDetailPage({ params }: PageProps) {
    const { id } = await params;

    const result = await getPropertyById(id);
    const property = result.success ? result.data : null;
    const session = await getSession();

    if (!property) {
        notFound();
    }

    const owner = property.owner;
    const reviews = (property as any).reviews || [];

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
                        <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-brand-primary transition-all border border-slate-100 hover:shadow-lg active:scale-90">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Image Gallery (Client Component) */}
                        <ImageGallery images={property.images} title={property.title} />

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

                            {/* Review Form */}
                            {session && (
                                <ReviewForm propertyId={property.id} userId={session.id} />
                            )}

                            {/* Reviews */}
                            {reviews.length > 0 && (
                                <div className="pt-8 border-t border-slate-200 space-y-6">
                                    <h2 className="text-2xl font-bold text-slate-900">Avis des locataires</h2>
                                    <div className="space-y-4">
                                        {reviews.map((review: any) => (
                                            <div key={review.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                                <div className="flex items-start justify-between mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">
                                                            {review.user?.name?.charAt(0) || 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-slate-900">{review.user?.name || 'Utilisateur'}</div>
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
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-6">
                        <PropertyActions
                            propertyId={property.id}
                            landlordId={property.ownerId}
                            landlordPhone={property.owner.phone}
                            price={property.price}
                            userId={session?.id}
                        />

                        {/* Owner Card (Only the header part, actions are in PropertyActions) */}
                        <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-soft">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">Informations Hôte</h3>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
