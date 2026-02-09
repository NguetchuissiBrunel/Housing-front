"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/housing/PropertyCard";
import { Property } from "@prisma/client";

interface SearchContentProps {
    initialProperties: Property[];
}

export default function SearchContent({ initialProperties }: SearchContentProps) {
    const searchParams = useSearchParams();
    const cityFromQuery = searchParams.get('city') || "";

    const [filters, setFilters] = useState({
        city: cityFromQuery,
        minPrice: 0,
        maxPrice: 500000,
        type: undefined as string | undefined,
        bedrooms: undefined as number | undefined,
    });

    const [filteredProperties, setFilteredProperties] = useState<Property[]>(initialProperties);

    useEffect(() => {
        let results = [...initialProperties];

        // Filter by city
        if (filters.city) {
            results = results.filter(p =>
                p.city.toLowerCase().includes(filters.city.toLowerCase()) ||
                p.address.toLowerCase().includes(filters.city.toLowerCase())
            );
        }

        // Filter by price
        results = results.filter(p =>
            p.price >= filters.minPrice && p.price <= filters.maxPrice
        );

        // Filter by bedrooms
        if (filters.bedrooms) {
            results = results.filter(p => p.bedrooms >= filters.bedrooms!);
        }

        // Filter by availability
        results = results.filter(p => p.available);

        setFilteredProperties(results);
    }, [filters, initialProperties]);

    const handleFilterChange = (newFilters: Partial<typeof filters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    return (
        <div className="container py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-2 tracking-tight">
                        {filters.city ? `Logements à ${filters.city}` : 'Tous les logements'}
                    </h1>
                    <p className="text-slate-500 text-lg font-medium">
                        {filteredProperties.length} {filteredProperties.length > 1 ? 'options disponibles' : 'option disponible'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Sidebar Filters */}
                <aside className="lg:col-span-3">
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 sticky top-24 shadow-soft">
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Filtres</h2>
                        <div className="space-y-8">
                            {/* City Filter */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Ville</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Yaoundé, Douala..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                                    value={filters.city}
                                    onChange={(e) => handleFilterChange({ city: e.target.value })}
                                />
                            </div>

                            {/* Price Range */}
                            <div className="space-y-4">
                                <label className="text-sm font-semibold text-slate-700">Budget Maximum</label>
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <span className="text-2xl font-bold text-slate-900">{filters.maxPrice.toLocaleString()}</span>
                                    <span className="text-xs font-bold text-slate-400">FCFA</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    className="w-full accent-brand-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                                    value={filters.maxPrice}
                                    onChange={(e) => handleFilterChange({ maxPrice: parseInt(e.target.value) })}
                                />
                            </div>

                            {/* Bedrooms Filter */}
                            <div className="space-y-3">
                                <label className="text-sm font-semibold text-slate-700">Chambres minimum</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[1, 2, 3, 4].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => handleFilterChange({ bedrooms: filters.bedrooms === num ? undefined : num })}
                                            className={`py-3 rounded-xl text-sm font-bold transition-all ${filters.bedrooms === num
                                                ? 'bg-brand-primary text-white shadow-lg'
                                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                                }`}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                fullWidth
                                className="text-xs font-bold py-3 uppercase tracking-wider mt-6"
                                onClick={() => handleFilterChange({ city: '', minPrice: 0, maxPrice: 500000, bedrooms: undefined })}
                            >
                                Réinitialiser
                            </Button>
                        </div>
                    </div>
                </aside>

                {/* Results Grid */}
                <main className="lg:col-span-9">
                    {filteredProperties.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            {filteredProperties.map((property, index) => (
                                <div
                                    key={property.id}
                                    className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-backwards"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <PropertyCard property={property} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-6 shadow-soft">
                                <Building2 className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Aucun logement trouvé</h3>
                            <p className="text-slate-500 max-w-md mx-auto text-base font-medium mb-6">
                                Modifiez vos filtres pour voir plus de résultats ou explorez toutes nos offres.
                            </p>
                            <Button
                                variant="primary"
                                className="px-8 py-4 rounded-2xl font-bold"
                                onClick={() => handleFilterChange({ city: '', minPrice: 0, maxPrice: 500000, bedrooms: undefined })}
                            >
                                Réinitialiser les filtres
                            </Button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
