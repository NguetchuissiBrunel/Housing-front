"use client";

import { Star, StarHalf, User, MessageCircle, ThumbsUp } from "lucide-react";
import Button from "@/components/ui/Button";

interface ReviewProps {
    rating: number;
    comment: string;
    userName: string;
    date: string;
}

export default function Reviews() {
    const reviews = [
        { id: 1, name: "Jean Dupont", rating: 5, date: "Il y a 2 semaines", comment: "Superbe logement ! Très propre et bien situé. Le propriétaire est très réactif." },
        { id: 2, name: "Marie K.", rating: 4, date: "Le mois dernier", comment: "Le studio est fonctionnel. Un peu de bruit le matin mais sinon parfait pour les études." },
    ];

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Avis des Étudiants</h2>
                    <div className="flex items-center gap-3">
                        <div className="flex text-amber-500">
                            {[1, 2, 3, 4].map((i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                            <StarHalf className="w-5 h-5 fill-current" />
                        </div>
                        <span className="text-lg font-black text-slate-900">4.8 / 5</span>
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px] ml-2">12 Avis au total</span>
                    </div>
                </div>
                <Button variant="outline" className="rounded-2xl h-14 px-8 font-black uppercase tracking-widest text-[10px]">
                    Donner mon avis
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((review) => (
                    <div key={review.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col justify-between">
                        <div className="space-y-6">
                            <div className="flex justify-between items-start">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
                                        <User className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900">{review.name}</div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{review.date}</div>
                                    </div>
                                </div>
                                <div className="flex text-amber-400">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <p className="text-slate-600 font-medium leading-relaxed italic">
                                &quot;{review.comment}&quot;
                            </p>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-50 flex items-center gap-6">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors text-xs font-bold">
                                <ThumbsUp className="w-4 h-4" /> Utile
                            </button>
                            <button className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors text-xs font-bold">
                                <MessageCircle className="w-4 h-4" /> Répondre
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center pt-4">
                <Button variant="ghost" className="text-brand-primary font-black uppercase tracking-widest text-[10px] hover:bg-brand-primary/5 rounded-2xl h-12">
                    Voir tous les avis
                </Button>
            </div>
        </div>
    );
}
