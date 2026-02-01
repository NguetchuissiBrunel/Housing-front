"use client";

import { useState } from 'react';
import { Search, MapPin, ShieldCheck, Clock, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Button from '../ui/Button';

export default function Hero() {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?city=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/search');
        }
    };

    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/analog-landscape-city-with-buildings.jpg"
                    alt="Cityscape"
                    className="w-full h-full object-cover opacity-20"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/40 via-slate-900/80 to-slate-900/90" />
            </div>

            {/* Minimalist Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="container relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    {/* Simplified Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 text-white text-[11px] font-bold uppercase tracking-wider animate-in fade-in duration-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-secondary animate-pulse" />
                        Logements vérifiés à Yaoundé
                    </div>

                    {/* Clean Typography */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] animate-in slide-in-from-bottom-4 duration-700">
                        Trouvez le logement étudiant <br className="hidden md:block" />
                        qui vous <span className="text-brand-secondary underline decoration-brand-secondary/30 decoration-8 underline-offset-8">correspond</span>.
                    </h1>

                    <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed animate-in slide-in-from-bottom-6 duration-700 delay-100">
                        La plateforme de référence pour les étudiants au Cameroun.
                        Sécurisé, sans frais d&apos;agence et 100% gratuit.
                    </p>

                    {/* Simplified Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="w-full max-w-2xl mx-auto flex flex-col md:flex-row gap-3 p-2 bg-white rounded-2xl border border-white/20 shadow-2xl shadow-black/20 animate-in slide-in-from-bottom-8 duration-700 delay-200"
                    >
                        <div className="flex-1 flex items-center gap-3 px-4 py-3">
                            <MapPin className="text-slate-400 w-5 h-5 shrink-0" />
                            <input
                                type="text"
                                placeholder="Dans quelle ville cherchez-vous ?"
                                className="w-full bg-transparent border-none focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium text-base outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="primary" size="lg" className="rounded-xl px-8 py-4 h-auto font-bold text-sm tracking-wide">
                            <Search className="w-4 h-4 mr-2" />
                            RECHERCHER
                        </Button>
                    </form>

                    {/* Minimal Stats */}
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 pt-12 animate-in fade-in duration-1000 delay-300">
                        {[
                            { icon: ShieldCheck, value: '100%', label: 'Vérifié' },
                            { icon: Clock, value: '24/7', label: 'Support' },
                            { icon: Home, value: '500+', label: 'Logements' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/10 backdrop-blur-lg rounded-lg text-white border border-white/20">
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white leading-none">{stat.value}</div>
                                    <div className="text-[10px] text-white/60 font-bold uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
