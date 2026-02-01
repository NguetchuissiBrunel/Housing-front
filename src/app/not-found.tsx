"use client";

import Link from "next/link";
import { MoveLeft, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="w-32 h-32 bg-white rounded-[40px] shadow-xl flex items-center justify-center text-brand-primary mb-8 animate-in fade-in zoom-in duration-500">
                <Search className="w-16 h-16" />
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                Page introuvable
            </h1>

            <p className="text-lg text-slate-500 max-w-md mx-auto mb-10 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                Désolé, la page que vous recherchez semble avoir été déplacée ou n'existe pas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                <Link href="/">
                    <Button variant="primary" size="lg" className="rounded-2xl px-8 py-4 font-bold shadow-lg shadow-brand-primary/20">
                        <MoveLeft className="w-5 h-5 mr-2" />
                        Retour à l'accueil
                    </Button>
                </Link>
                <Link href="/search">
                    <Button variant="outline" size="lg" className="rounded-2xl px-8 py-4 font-bold bg-white hover:bg-slate-50">
                        Voir les logements
                    </Button>
                </Link>
            </div>
        </div>
    );
}
