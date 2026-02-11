"use client";

import { useState } from "react";
import { Star, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { createReview } from "@/app/actions/review-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
    propertyId: string;
    userId?: string;
}

export default function ReviewForm({ propertyId, userId }: ReviewFormProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            toast.error("Veuillez vous connecter pour laisser un avis");
            router.push("/login");
            return;
        }

        if (rating === 0) {
            toast.error("Veuillez sélectionner une note");
            return;
        }

        if (comment.trim().length < 5) {
            toast.error("Le commentaire doit faire au moins 5 caractères");
            return;
        }

        setIsSubmitting(true);
        try {
            const result = await createReview({
                propertyId,
                userId,
                rating,
                comment,
            });

            if (result.success) {
                toast.success("Merci pour votre avis !");
                setRating(0);
                setComment("");
                router.refresh();
            } else {
                toast.error("Erreur lors de la soumission de l'avis");
            }
        } catch (error) {
            toast.error("Une erreur s'est produite");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Laisser un avis</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Note</label>
                    <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                onMouseEnter={() => setHover(star)}
                                onMouseLeave={() => setHover(0)}
                                className="transition-all transform hover:scale-110"
                            >
                                <Star
                                    className={`w-8 h-8 ${(hover || rating) >= star
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-slate-300"
                                        }`}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Commentaire</label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Partagez votre expérience avec ce logement..."
                        className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary min-h-[120px] resize-none text-slate-700"
                    />
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                    className="rounded-2xl px-12 h-14 font-bold uppercase tracking-wider gap-2 shadow-lg shadow-brand-primary/20"
                >
                    {isSubmitting ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        "Publier l'avis"
                    )}
                </Button>
            </form>
        </div>
    );
}
