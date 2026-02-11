"use client";

import { useEffect, useState } from "react";
import { MessageSquare, Phone, CheckCircle2, Loader2, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import { startConversation } from "@/app/actions/message-actions";
import { createBooking } from "@/app/actions/booking-actions";
import { toggleFavorite, isFavorited } from "@/app/actions/favorite-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface PropertyActionsProps {
    propertyId: string;
    landlordId: string;
    landlordPhone?: string | null;
    price: number;
    userId?: string;
}

export default function PropertyActions({ propertyId, landlordId, landlordPhone, price, userId }: PropertyActionsProps) {
    const router = useRouter();
    const [isBooking, setIsBooking] = useState(false);
    const [isMessaging, setIsMessaging] = useState(false);
    const [isLiking, setIsLiking] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showPhone, setShowPhone] = useState(false);

    useEffect(() => {
        if (userId) {
            isFavorited(userId, propertyId).then(setIsLiked);
        }
    }, [userId, propertyId]);

    const handleStartConversation = async () => {
        if (!userId) {
            toast.error("Veuillez vous connecter pour envoyer un message");
            router.push("/login");
            return;
        }

        setIsMessaging(true);
        try {
            const result = await startConversation({
                propertyId,
                studentId: userId,
                landlordId,
            });

            if (result.success && result.data) {
                toast.success("Conversation démarrée !");
                router.push(`/messages?id=${result.data.id}`);
            } else {
                toast.error("Erreur lors de l'ouverture de la conversation");
            }
        } catch (error) {
            console.error("Messaging error:", error);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsMessaging(false);
        }
    };

    const handleBooking = async () => {
        if (!userId) {
            toast.error("Veuillez vous connecter pour réserver");
            router.push("/login");
            return;
        }

        setIsBooking(true);
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() + 1);
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);

            const result = await createBooking({
                propertyId,
                userId,
                startDate,
                endDate,
                totalPrice: price,
            });

            if (result.success) {
                toast.success("Demande de réservation envoyée !");
                router.push("/dashboard");
            } else {
                toast.error(result.error || "Erreur lors de la réservation");
            }
        } catch (error) {
            console.error("Booking error:", error);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsBooking(false);
        }
    };

    const handleToggleFavorite = async () => {
        if (!userId) {
            toast.error("Veuillez vous connecter pour ajouter aux favoris");
            router.push("/login");
            return;
        }

        setIsLiking(true);
        try {
            const result = await toggleFavorite({ userId, propertyId });
            if (result.success) {
                setIsLiked(result.action === "added");
                toast.success(result.action === "added" ? "Ajouté aux favoris !" : "Retiré des favoris !");
            } else {
                toast.error(result.error || "Erreur lors de la mise à jour des favoris");
            }
        } catch (error) {
            console.error("Favorite toggle error:", error);
            toast.error("Une erreur s'est produite");
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-[40px] p-8 text-white space-y-6 shadow-2xl">
                <div className="space-y-2">
                    <span className="text-white/60 text-xs font-bold uppercase tracking-wider">Prix mensuel</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold">{price.toLocaleString()}</span>
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

                <Button
                    variant="secondary"
                    fullWidth
                    size="lg"
                    className="h-16 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-xl bg-white text-brand-primary hover:bg-slate-50"
                    onClick={handleBooking}
                    disabled={isBooking}
                >
                    {isBooking ? <Loader2 className="w-6 h-6 animate-spin" /> : "Réserver maintenant"}
                </Button>

                <p className="text-center text-xs font-bold text-white/40 uppercase tracking-wider">
                    Paiement sécurisé
                </p>
            </div>

            <div className="bg-white rounded-[40px] p-8 border border-slate-200 shadow-soft space-y-6">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Propriétaire</h3>
                <div className="grid grid-cols-1 gap-3">
                    <Button
                        variant="primary"
                        fullWidth
                        className="rounded-2xl h-14 font-bold text-xs uppercase tracking-wider gap-2"
                        onClick={handleStartConversation}
                        disabled={isMessaging}
                    >
                        {isMessaging ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <MessageSquare className="w-4 h-4" /> Envoyer un message
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        fullWidth
                        className={`rounded-2xl h-14 font-bold text-xs uppercase tracking-wider gap-2 transition-all ${isLiked ? 'text-red-500 border-red-200 bg-red-50 hover:bg-red-100' : ''}`}
                        onClick={handleToggleFavorite}
                        disabled={isLiking}
                    >
                        {isLiking ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500' : ''}`} />
                                {isLiked ? "Retirer des favoris" : "Ajouter aux favoris"}
                            </>
                        )}
                    </Button>

                    <Button
                        variant="outline"
                        fullWidth
                        className={`rounded-2xl h-14 bg-slate-50 border-transparent font-bold text-xs uppercase tracking-wider gap-2 hover:bg-slate-100 transition-all ${showPhone ? 'text-brand-primary bg-brand-primary/5 border-brand-primary/20' : 'text-slate-600'}`}
                        onClick={() => setShowPhone(!showPhone)}
                    >
                        <Phone className="w-4 h-4" />
                        {showPhone ? (landlordPhone || "Non renseigné") : "Voir le contact"}
                    </Button>
                </div>
            </div>
        </div>
    );
}
