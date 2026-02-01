"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2, MessageSquare, Calendar, Settings, Plus, Eye, Edit, Trash2, MoreVertical } from "lucide-react";
import Button from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/auth";
import { mockProperties } from "@/lib/mockData";

export default function LandlordDashboard() {
    const currentUser = getCurrentUser();
    const [activeTab, setActiveTab] = useState<'properties' | 'messages' | 'bookings' | 'settings'>('properties');

    // Filter properties owned by current landlord (simulation)
    const myProperties = mockProperties.slice(0, 3); // Simulated landlord properties

    // Stats
    const stats = [
        { label: 'Propriétés', value: myProperties.length, icon: Building2, color: 'bg-brand-secondary' },
        { label: 'Messages', value: 5, icon: MessageSquare, color: 'bg-blue-500' },
        { label: 'Réservations', value: 12, icon: Calendar, color: 'bg-amber-500' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="container py-8">
                {/* Header */}
                <div className="bg-gradient-to-br from-brand-secondary to-brand-secondary-dark rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />

                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Espace Bailleur</h1>
                                <p className="text-white/80 text-lg">Bienvenue, {currentUser?.name || 'Bailleur'}</p>
                            </div>
                            <Link href="/landlord/publish">
                                <Button variant="secondary" className="bg-white text-brand-secondary hover:bg-white/90 gap-2">
                                    <Plus className="w-5 h-5" />
                                    Publier une offre
                                </Button>
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                            <stat.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold">{stat.value}</div>
                                            <div className="text-white/80 text-sm">{stat.label}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl border border-slate-200 mb-6 p-2 flex gap-2 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab('properties')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'properties'
                                ? 'bg-brand-secondary text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Building2 className="w-5 h-5 inline mr-2" />
                        Mes Propriétés
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'messages'
                                ? 'bg-brand-secondary text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <MessageSquare className="w-5 h-5 inline mr-2" />
                        Messages
                    </button>
                    <button
                        onClick={() => setActiveTab('bookings')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'bookings'
                                ? 'bg-brand-secondary text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Calendar className="w-5 h-5 inline mr-2" />
                        Réservations
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${activeTab === 'settings'
                                ? 'bg-brand-secondary text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <Settings className="w-5 h-5 inline mr-2" />
                        Paramètres
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-3xl border border-slate-200 p-8">
                    {activeTab === 'properties' && (
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Mes Propriétés</h2>
                                <Link href="/landlord/publish">
                                    <Button variant="primary" className="gap-2">
                                        <Plus className="w-5 h-5" />
                                        Nouvelle offre
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {myProperties.map((property) => (
                                    <div key={property.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group">
                                        <div className="relative h-48">
                                            <img
                                                src={property.images[0]}
                                                alt={property.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3">
                                                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50">
                                                    <MoreVertical className="w-5 h-5 text-slate-600" />
                                                </button>
                                            </div>
                                            <div className="absolute top-3 left-3">
                                                <span className="px-3 py-1 bg-brand-secondary text-white text-xs font-bold rounded-full">
                                                    Disponible
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-lg text-slate-900 mb-2 line-clamp-1">{property.title}</h3>
                                            <p className="text-slate-600 text-sm mb-3">{property.address}, {property.city}</p>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="text-2xl font-bold text-brand-secondary">{property.price.toLocaleString()} FCFA</div>
                                                <div className="text-sm text-slate-500">/mois</div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-slate-200">
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-slate-900">124</div>
                                                    <div className="text-xs text-slate-500">Vues</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-slate-900">8</div>
                                                    <div className="text-xs text-slate-500">Messages</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold text-slate-900">3</div>
                                                    <div className="text-xs text-slate-500">Demandes</div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="grid grid-cols-3 gap-2">
                                                <button className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Voir</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-1 px-3 py-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Modifier</span>
                                                </button>
                                                <button className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Supprimer</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {myProperties.length === 0 && (
                                <div className="text-center py-16">
                                    <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune propriété</h3>
                                    <p className="text-slate-600 mb-6">Commencez par publier votre première offre de logement</p>
                                    <Link href="/landlord/publish">
                                        <Button variant="primary" className="gap-2">
                                            <Plus className="w-5 h-5" />
                                            Publier une offre
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'messages' && (
                        <div className="text-center py-16">
                            <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Messagerie</h3>
                            <p className="text-slate-600">La fonctionnalité de messagerie sera bientôt disponible</p>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="text-center py-16">
                            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Réservations</h3>
                            <p className="text-slate-600">Aucune réservation pour le moment</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="text-center py-16">
                            <Settings className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Paramètres</h3>
                            <p className="text-slate-600">Gérez vos paramètres de compte</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
