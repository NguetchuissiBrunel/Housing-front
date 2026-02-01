"use client";

import { useState } from "react";
import { Home, Heart, Calendar, MessageSquare, Settings, LogOut, Star, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { mockBookings, mockProperties, getPropertyById, mockUsers } from "@/lib/mockData";
import { formatPrice, formatDate } from "@/lib/utils";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState<'bookings' | 'favorites'>('bookings');

    // Simuler un utilisateur connecté
    const currentUser = mockUsers[2]; // Marie Kamga (étudiant)
    const userBookings = mockBookings.filter(b => b.userId === currentUser.id);

    return (
        <div className="min-h-screen pt-20 bg-slate-50">
            {/* Header with Background */}
            <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="/images/black-businessman-happy-expression.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container relative z-10">
                    <div className="flex items-center gap-6">
                        <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center text-white text-4xl font-bold border-4 border-white/30">
                            {currentUser.name.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Bienvenue, {currentUser.name} !</h1>
                            <p className="text-white/80 font-medium">Gérez vos réservations et favoris</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-6 sticky top-24">
                            <nav className="space-y-2">
                                {[
                                    { icon: Calendar, label: 'Mes réservations', id: 'bookings' },
                                    { icon: Heart, label: 'Mes favoris', id: 'favorites' },
                                    { icon: MessageSquare, label: 'Messages', id: 'messages' },
                                    { icon: Settings, label: 'Paramètres', id: 'settings' },
                                ].map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id as any)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all ${activeTab === item.id
                                                ? 'bg-brand-primary text-white shadow-lg'
                                                : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.label}
                                    </button>
                                ))}
                                <div className="pt-4 border-t border-slate-100">
                                    <Link href="/">
                                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-red-600 hover:bg-red-50 transition-all">
                                            <LogOut className="w-5 h-5" />
                                            Déconnexion
                                        </button>
                                    </Link>
                                </div>
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">
                        {activeTab === 'bookings' && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl font-bold text-slate-900">Mes Réservations</h2>
                                    <Badge variant="primary" className="text-sm px-4 py-2">
                                        {userBookings.length} {userBookings.length > 1 ? 'réservations' : 'réservation'}
                                    </Badge>
                                </div>

                                {userBookings.length > 0 ? (
                                    <div className="space-y-4">
                                        {userBookings.map((booking) => {
                                            const property = getPropertyById(booking.propertyId);
                                            if (!property) return null;

                                            return (
                                                <div key={booking.id} className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden hover:shadow-xl transition-all">
                                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                                                        <div className="md:col-span-4">
                                                            <img
                                                                src={property.images[0]}
                                                                alt={property.title}
                                                                className="w-full h-64 md:h-full object-cover"
                                                            />
                                                        </div>
                                                        <div className="md:col-span-8 p-6 space-y-4">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <div className="flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-wider mb-2">
                                                                        <MapPin className="w-3 h-3" />
                                                                        {property.city}
                                                                    </div>
                                                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{property.title}</h3>
                                                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                                        <span className="font-semibold">{property.rating}</span>
                                                                    </div>
                                                                </div>
                                                                <Badge
                                                                    variant={
                                                                        booking.status === 'CONFIRMED' ? 'success' :
                                                                            booking.status === 'PENDING' ? 'warning' :
                                                                                booking.status === 'CANCELLED' ? 'danger' : 'default'
                                                                    }
                                                                    className="text-xs px-3 py-1.5"
                                                                >
                                                                    {booking.status === 'CONFIRMED' ? 'Confirmé' :
                                                                        booking.status === 'PENDING' ? 'En attente' :
                                                                            booking.status === 'CANCELLED' ? 'Annulé' : 'Terminé'}
                                                                </Badge>
                                                            </div>

                                                            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                                                                <div>
                                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Début</div>
                                                                    <div className="font-bold text-slate-900">{formatDate(booking.startDate)}</div>
                                                                </div>
                                                                <div>
                                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Fin</div>
                                                                    <div className="font-bold text-slate-900">{formatDate(booking.endDate)}</div>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Prix total</div>
                                                                    <div className="text-2xl font-bold text-brand-primary">
                                                                        {formatPrice(booking.totalPrice)} <span className="text-sm text-slate-400">FCFA</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-3">
                                                                    <Link href={`/housing/${property.id}`}>
                                                                        <Button variant="outline" size="sm" className="rounded-xl">
                                                                            Voir le logement
                                                                        </Button>
                                                                    </Link>
                                                                    {booking.status === 'CONFIRMED' && (
                                                                        <Button variant="primary" size="sm" className="rounded-xl">
                                                                            Contacter
                                                                        </Button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
                                        <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune réservation</h3>
                                        <p className="text-slate-500 mb-6">Vous n'avez pas encore réservé de logement</p>
                                        <Link href="/search">
                                            <Button variant="primary" className="px-8 py-3 rounded-2xl">
                                                Explorer les logements
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'favorites' && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900">Mes Favoris</h2>
                                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
                                    <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun favori</h3>
                                    <p className="text-slate-500 mb-6">Sauvegardez vos logements préférés pour les retrouver facilement</p>
                                    <Link href="/search">
                                        <Button variant="primary" className="px-8 py-3 rounded-2xl">
                                            Découvrir des logements
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900">Messages</h2>
                                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center">
                                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun message</h3>
                                    <p className="text-slate-500">Vos conversations avec les propriétaires apparaîtront ici</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold text-slate-900">Paramètres</h2>
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label>
                                            <input
                                                type="text"
                                                defaultValue={currentUser.name}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                defaultValue={currentUser.email}
                                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                                            />
                                        </div>
                                        <Button variant="primary" className="px-8 py-3 rounded-2xl">
                                            Enregistrer les modifications
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
