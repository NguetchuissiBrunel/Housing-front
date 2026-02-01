"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Upload, MapPin, DollarSign, Bed, Bath, Maximize, Wifi, Utensils, Wind, Car, Shield, Zap, Droplet, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";

export default function PublishPropertyPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "studio",
        city: "Yaoundé",
        address: "",
        bedrooms: 1,
        bathrooms: 1,
        area: 0,
        price: 0,
        deposit: 0,
        availableFrom: "",
        minDuration: 6,
    });

    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

    const amenities = [
        { id: "wifi", label: "Wi-Fi", icon: Wifi },
        { id: "furnished", label: "Meublé", icon: Bed },
        { id: "kitchen", label: "Cuisine équipée", icon: Utensils },
        { id: "ac", label: "Climatisation", icon: Wind },
        { id: "parking", label: "Parking", icon: Car },
        { id: "security", label: "Sécurité 24/7", icon: Shield },
        { id: "electricity", label: "Électricité stable", icon: Zap },
        { id: "water", label: "Eau courante", icon: Droplet },
    ];

    const propertyTypes = [
        { value: "studio", label: "Studio" },
        { value: "t2", label: "T2 (2 pièces)" },
        { value: "t3", label: "T3 (3 pièces)" },
        { value: "t4", label: "T4+ (4 pièces ou plus)" },
        { value: "chambre", label: "Chambre" },
    ];

    const cities = [
        "Yaoundé",
        "Douala",
        "Bafoussam",
        "Bamenda",
        "Garoua",
        "Maroua",
        "Ngaoundéré",
        "Bertoua",
        "Buea",
        "Limbe",
    ];

    const toggleAmenity = (amenityId: string) => {
        setSelectedAmenities(prev =>
            prev.includes(amenityId)
                ? prev.filter(id => id !== amenityId)
                : [...prev, amenityId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulation de publication
        console.log("Property data:", { ...formData, amenities: selectedAmenities });
        // Redirection vers le dashboard bailleur
        router.push("/landlord/dashboard");
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="container py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href="/landlord/dashboard" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4">
                        <ArrowLeft className="w-5 h-5" />
                        <span className="font-semibold">Retour au dashboard</span>
                    </Link>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2">Publier une offre de logement</h1>
                    <p className="text-slate-600 text-lg">Remplissez les informations ci-dessous pour publier votre propriété</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl">
                    {/* Informations de base */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                                <Home className="w-6 h-6 text-brand-secondary" />
                            </div>
                            Informations de base
                        </h2>

                        <div className="space-y-5">
                            <Input
                                type="text"
                                label="Titre de l'annonce"
                                placeholder="Ex: Studio moderne proche université"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Description complète</label>
                                <textarea
                                    rows={6}
                                    placeholder="Décrivez votre logement en détail..."
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Type de logement</label>
                                    <select
                                        value={formData.type}
                                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary transition-all"
                                        required
                                    >
                                        {propertyTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ville</label>
                                    <select
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary transition-all"
                                        required
                                    >
                                        {cities.map(city => (
                                            <option key={city} value={city}>{city}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <Input
                                type="text"
                                label="Adresse complète"
                                placeholder="Ex: Quartier Melen, près de l'université"
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Caractéristiques */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                                <Maximize className="w-6 h-6 text-brand-secondary" />
                            </div>
                            Caractéristiques
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            <Input
                                type="number"
                                label="Nombre de chambres"
                                value={formData.bedrooms}
                                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                                min="0"
                                required
                            />

                            <Input
                                type="number"
                                label="Nombre de salles de bain"
                                value={formData.bathrooms}
                                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                                min="1"
                                required
                            />

                            <Input
                                type="number"
                                label="Surface (m²)"
                                value={formData.area}
                                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
                                min="1"
                                required
                            />
                        </div>
                    </div>

                    {/* Prix */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-brand-secondary" />
                            </div>
                            Tarification
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                type="number"
                                label="Loyer mensuel (FCFA)"
                                placeholder="75000"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                min="1"
                                required
                            />

                            <Input
                                type="number"
                                label="Caution (FCFA)"
                                placeholder="150000"
                                value={formData.deposit}
                                onChange={(e) => setFormData({ ...formData, deposit: parseInt(e.target.value) })}
                                min="0"
                                required
                            />
                        </div>
                    </div>

                    {/* Équipements */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Équipements et services</h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {amenities.map((amenity) => (
                                <button
                                    key={amenity.id}
                                    type="button"
                                    onClick={() => toggleAmenity(amenity.id)}
                                    className={`p-4 rounded-2xl border-2 transition-all ${selectedAmenities.includes(amenity.id)
                                            ? 'border-brand-secondary bg-brand-secondary/5'
                                            : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <amenity.icon className={`w-6 h-6 mx-auto mb-2 ${selectedAmenities.includes(amenity.id) ? 'text-brand-secondary' : 'text-slate-400'
                                        }`} />
                                    <div className={`text-sm font-semibold ${selectedAmenities.includes(amenity.id) ? 'text-brand-secondary' : 'text-slate-700'
                                        }`}>
                                        {amenity.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Disponibilité */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Disponibilité</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <Input
                                type="date"
                                label="Disponible à partir du"
                                value={formData.availableFrom}
                                onChange={(e) => setFormData({ ...formData, availableFrom: e.target.value })}
                                required
                            />

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Durée minimum (mois)</label>
                                <select
                                    value={formData.minDuration}
                                    onChange={(e) => setFormData({ ...formData, minDuration: parseInt(e.target.value) })}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary transition-all"
                                    required
                                >
                                    <option value="3">3 mois</option>
                                    <option value="6">6 mois</option>
                                    <option value="9">9 mois</option>
                                    <option value="12">12 mois</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Images */}
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-secondary/10 rounded-xl flex items-center justify-center">
                                <Upload className="w-6 h-6 text-brand-secondary" />
                            </div>
                            Photos du logement
                        </h2>

                        <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center hover:border-brand-secondary transition-colors cursor-pointer">
                            <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                            <p className="text-slate-600 font-semibold mb-2">Cliquez pour ajouter des photos</p>
                            <p className="text-sm text-slate-500">ou glissez-déposez vos images ici</p>
                            <p className="text-xs text-slate-400 mt-3">Format acceptés : JPG, PNG (max 5MB par image)</p>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                            <p className="text-sm text-blue-800">
                                💡 <strong>Mode démo</strong> : L'upload d'images est simulé. Les images par défaut seront utilisées.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <Button
                            type="button"
                            variant="secondary"
                            size="lg"
                            className="flex-1"
                            onClick={() => router.push("/landlord/dashboard")}
                        >
                            Annuler
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="flex-1 bg-brand-secondary hover:bg-brand-secondary-dark"
                        >
                            Publier l'offre
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
