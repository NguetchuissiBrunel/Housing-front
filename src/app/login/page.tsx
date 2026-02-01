"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Home } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { mockUsers, UserRole } from "@/lib/mockData";
import { setCurrentUser, getDashboardUrl } from "@/lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulation de connexion - trouver l'utilisateur par email
        // En mode démo, on accepte n'importe quel email
        let user = mockUsers.find(u => u.email === formData.email);

        // Si pas trouvé, créer un utilisateur étudiant par défaut
        if (!user) {
            user = {
                id: Math.random().toString(36).substr(2, 9),
                name: formData.email.split('@')[0],
                email: formData.email,
                role: UserRole.STUDENT,
                verified: true
            };
        }

        // Sauvegarder l'utilisateur connecté
        setCurrentUser({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        });

        // Redirection selon le rôle
        const dashboardUrl = getDashboardUrl(user.role);
        router.push(dashboardUrl);
    };

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-5">
                <img
                    src="/images/still-life-keys-new-home.jpg"
                    alt="Keys"
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="container relative z-10 py-20">
                <div className="max-w-md mx-auto">
                    {/* Logo/Title */}
                    <div className="text-center mb-10">
                        <Link href="/" className="inline-flex items-center gap-3 mb-6">
                            <div className="w-14 h-14 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg">
                                <Home className="w-8 h-8" />
                            </div>
                            <span className="text-3xl font-black text-slate-900">Logement</span>
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Bon retour !</h1>
                        <p className="text-slate-500 font-medium">Connectez-vous pour accéder à votre compte</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <Input
                                type="email"
                                label="Adresse email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    label="Mot de passe"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-[42px] text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20" />
                                    <span className="text-slate-600 font-medium">Se souvenir de moi</span>
                                </label>
                                <Link href="/forgot-password" className="text-brand-primary font-semibold hover:underline">
                                    Mot de passe oublié ?
                                </Link>
                            </div>

                            <Button type="submit" variant="primary" fullWidth size="lg" className="h-14 rounded-2xl font-bold text-base">
                                Se connecter
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-600 font-medium">
                                Pas encore de compte ?{" "}
                                <Link href="/register" className="text-brand-primary font-bold hover:underline">
                                    Créer un compte
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100 space-y-2">
                        <p className="text-sm text-blue-800 text-center font-medium">
                            💡 <strong>Mode démo</strong> : Utilisez ces emails pour tester les différents rôles
                        </p>
                        <div className="text-xs text-blue-700 space-y-1">
                            <div className="flex justify-between px-4">
                                <span className="font-semibold">Étudiant :</span>
                                <code className="bg-blue-100 px-2 py-0.5 rounded">marie.ngo@student.cm</code>
                            </div>
                            <div className="flex justify-between px-4">
                                <span className="font-semibold">Bailleur :</span>
                                <code className="bg-blue-100 px-2 py-0.5 rounded">jean.kamga@logement.cm</code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
