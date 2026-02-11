"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Building2, MessageSquare, Calendar, Settings, Plus, Eye, Edit, Trash2, MoreVertical, LogOut, Loader2, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";
import { logout, updateProfile } from "@/app/actions/auth-actions";
import { updateBookingStatus } from "@/app/actions/booking-actions";
import { deleteProperty } from "@/app/actions/property-actions";
import { useRouter } from "next/navigation";
import { clearCurrentUser } from "@/lib/auth";
import Badge from "@/components/ui/Badge";
import { toast } from "sonner";

interface LandlordDashboardProps {
    user: any;
    properties: any[];
    bookings: any[];
    conversations: any[];
}

export default function LandlordDashboard({ user, properties, bookings, conversations }: LandlordDashboardProps) {
    const [activeTab, setActiveTab] = useState<'properties' | 'messages' | 'bookings' | 'settings'>('properties');
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

    const handleLogout = async () => {
        await logout();
        clearCurrentUser();
        router.push("/");
        router.refresh();
    }

    const handleUpdateStatus = async (bookingId: string, status: any) => {
        setIsUpdating(bookingId);
        try {
            const result = await updateBookingStatus(bookingId, status);
            if (result.success) {
                toast.success(`Réservation ${status === 'CONFIRMED' ? 'confirmée' : 'refusée'} avec succès`);
                router.refresh();
            } else {
                toast.error("Erreur lors de la mise à jour");
            }
        } catch (error) {
            toast.error("Une erreur s'est produite");
        } finally {
            setIsUpdating(null);
        }
    };

    const handleDeleteProperty = async (propertyId: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ? Cette action est irréversible.")) {
            return;
        }

        setIsDeleting(propertyId);
        try {
            const result = await deleteProperty(propertyId);
            if (result.success) {
                toast.success("Annonce supprimée avec succès");
                router.refresh();
            } else {
                toast.error("Erreur lors de la suppression");
            }
        } catch (error) {
            toast.error("Une erreur s'est produite");
        } finally {
            setIsDeleting(null);
        }
    };

    // Stats
    const stats = [
        { label: 'Propriétés', value: properties.length, icon: Building2, color: 'bg-brand-secondary' },
        { label: 'Messages', value: conversations.length, icon: MessageSquare, color: 'bg-blue-500' },
        { label: 'Réservations', value: bookings.length, icon: Calendar, color: 'bg-amber-500' },
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
                                <p className="text-white/80 text-lg">Bienvenue, {user.name || user.email.split('@')[0]}</p>
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
                    {[
                        { id: 'properties', label: 'Mes Propriétés', icon: Building2 },
                        { id: 'messages', label: 'Messages', icon: MessageSquare },
                        { id: 'bookings', label: 'Réservations', icon: Calendar },
                        { id: 'settings', label: 'Paramètres', icon: Settings },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                                ? 'bg-brand-secondary text-white'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 rounded-xl font-semibold text-red-600 hover:bg-red-50 transition-all ml-auto flex items-center gap-2"
                    >
                        <LogOut className="w-5 h-5" />
                        Déconnexion
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
                                {properties.map((property) => (
                                    <div key={property.id} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group">
                                        <div className="relative h-48">
                                            <img
                                                src={property.images[0] || "/images/placeholder.jpg"}
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

                                            {/* Actions */}
                                            <div className="grid grid-cols-3 gap-2">
                                                <Link href={`/housing/${property.id}`} className="flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Voir</span>
                                                </Link>
                                                <Link href={`/landlord/edit/${property.id}`} className="flex items-center justify-center gap-1 px-3 py-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                    <span className="text-xs font-semibold">Modifier</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteProperty(property.id)}
                                                    disabled={isDeleting === property.id}
                                                    className="flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                                                >
                                                    {isDeleting === property.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    <span className="text-xs font-semibold">Supprimer</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {properties.length === 0 && (
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
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Messages</h2>
                            {conversations.length > 0 ? (
                                <div className="bg-white rounded-3xl border border-slate-200 shadow-soft divide-y divide-slate-100">
                                    {conversations.map(conv => (
                                        <Link key={conv.id} href={`/messages?id=${conv.id}`} className="block p-6 hover:bg-slate-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-bold text-slate-900">{conv.student.name} - {conv.property.title}</h4>
                                                    <p className="text-sm text-slate-500 truncate max-w-md">{conv.lastMessage || "Pas de message"}</p>
                                                </div>
                                                <span className="text-xs text-slate-400">{conv.lastMessageTime ? new Date(conv.lastMessageTime).toLocaleDateString() : "Récemment"}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <MessageSquare className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Messagerie</h3>
                                    <p className="text-slate-600">Vous n'avez pas encore de messages de potentiels locataires</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Réservations</h2>
                            {bookings.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead className="bg-slate-50 border-y border-slate-200">
                                            <tr>
                                                <th className="px-6 py-4 font-bold text-slate-700">Logement</th>
                                                <th className="px-6 py-4 font-bold text-slate-700">Étudiant</th>
                                                <th className="px-6 py-4 font-bold text-slate-700">Dates</th>
                                                <th className="px-6 py-4 font-bold text-slate-700">Statut</th>
                                                <th className="px-6 py-4 font-bold text-slate-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {bookings.map(booking => (
                                                <tr key={booking.id} className="hover:bg-slate-50">
                                                    <td className="px-6 py-4 font-semibold">{booking.property.title}</td>
                                                    <td className="px-6 py-4">{booking.user?.name || "Étudiant"}</td>
                                                    <td className="px-6 py-4 text-sm text-slate-600">
                                                        {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge variant={booking.status === 'CONFIRMED' ? 'success' : 'warning'}>
                                                            {booking.status}
                                                        </Badge>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex gap-2">
                                                            {booking.status === 'PENDING' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(booking.id, 'CONFIRMED')}
                                                                        disabled={isUpdating === booking.id}
                                                                        className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors disabled:opacity-50"
                                                                        title="Confirmer"
                                                                    >
                                                                        {isUpdating === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-5 h-5" />}
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')}
                                                                        disabled={isUpdating === booking.id}
                                                                        className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors disabled:opacity-50"
                                                                        title="Refuser"
                                                                    >
                                                                        {isUpdating === booking.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-5 h-5" />}
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <Button size="sm" variant="outline" disabled>Terminé</Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Réservations</h3>
                                    <p className="text-slate-600">Aucune réservation pour le moment</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Paramètres</h2>
                            <div className="bg-white rounded-3xl border border-slate-200 shadow-soft p-8 max-w-2xl">
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    setIsUpdatingProfile(true);
                                    const formData = new FormData(e.currentTarget);
                                    const name = formData.get('name') as string;
                                    const phone = formData.get('phone') as string;

                                    try {
                                        const result = await updateProfile({ name, phone });
                                        if (result.success) {
                                            toast.success("Profil mis à jour avec succès");
                                            router.refresh();
                                        } else {
                                            toast.error(result.error || "Erreur lors de la mise à jour");
                                        }
                                    } catch (error) {
                                        toast.error("Une erreur s'est produite");
                                    } finally {
                                        setIsUpdatingProfile(false);
                                    }
                                }} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Nom complet</label>
                                        <input
                                            type="text"
                                            name="name"
                                            defaultValue={user.name}
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Email (non modifiable)</label>
                                        <input
                                            type="email"
                                            defaultValue={user.email}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 cursor-not-allowed"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">Numéro de téléphone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            defaultValue={user.phone}
                                            placeholder="Ex: 690 00 00 00"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-secondary/20 focus:border-brand-secondary"
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        className="bg-brand-secondary hover:bg-brand-secondary-dark px-8 gap-2"
                                        disabled={isUpdatingProfile}
                                    >
                                        {isUpdatingProfile && <Loader2 className="w-4 h-4 animate-spin" />}
                                        Sauvegarder
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
