"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-8 animate-in fade-in zoom-in duration-500">
                <AlertCircle className="w-12 h-12" />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 animate-in slide-in-from-bottom-4 duration-500 delay-100">
                Une erreur est survenue
            </h1>

            <p className="text-slate-500 max-w-md mx-auto mb-10 animate-in slide-in-from-bottom-4 duration-500 delay-200">
                Nous sommes désolés, mais quelque chose s'est mal passé lors du chargement de cette page.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                <Button
                    onClick={reset}
                    variant="primary"
                    size="lg"
                    className="rounded-2xl px-8 py-4 font-bold shadow-lg shadow-brand-primary/20"
                >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Réessayer
                </Button>
                <Link href="/">
                    <Button variant="outline" size="lg" className="rounded-2xl px-8 py-4 font-bold bg-white hover:bg-slate-50">
                        <Home className="w-5 h-5 mr-2" />
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    );
}
