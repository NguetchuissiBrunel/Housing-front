"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff, Home, GraduationCap, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@prisma/client";
import { setCurrentUser, getDashboardUrl } from "@/lib/auth";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.STUDENT);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const { register: registerAction } = require("@/app/actions/auth-actions");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        setLoading(true);

        try {
            const result = await registerAction({
                email: formData.email,
                name: formData.name,
                role: selectedRole,
                phone: formData.phone,
                password: formData.password
            });

            if (result.success) {
                // Sync client-side state
                setCurrentUser(result.data);

                // Redirection selon le rôle
                const dashboardUrl = getDashboardUrl(result.data.role);
                router.push(dashboardUrl);
                router.refresh();
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Une erreur est survenue lors de l'inscription");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 opacity-5">
                <img
                    src="/images/new-home-keys-plan-table-with-defocused-couple.jpg"
                    alt="New Home"
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
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Créer un compte</h1>
                        <p className="text-slate-500 font-medium">Rejoignez des milliers d'étudiants</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    {/* Register Form */}
                    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8">
                        {/* Role Selection */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold text-slate-700 mb-3">Je suis :</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole(UserRole.STUDENT)}
                                    className={`p-4 rounded-2xl border-2 transition-all ${selectedRole === UserRole.STUDENT
                                        ? 'border-brand-primary bg-brand-primary/5 shadow-lg'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <GraduationCap className={`w-8 h-8 mx-auto mb-2 ${selectedRole === UserRole.STUDENT ? 'text-brand-primary' : 'text-slate-400'
                                        }`} />
                                    <div className={`font-bold ${selectedRole === UserRole.STUDENT ? 'text-brand-primary' : 'text-slate-700'
                                        }`}>
                                        Étudiant
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Je cherche un logement</div>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole(UserRole.LANDLORD)}
                                    className={`p-4 rounded-2xl border-2 transition-all ${selectedRole === UserRole.LANDLORD
                                        ? 'border-brand-secondary bg-brand-secondary/5 shadow-lg'
                                        : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                >
                                    <Building2 className={`w-8 h-8 mx-auto mb-2 ${selectedRole === UserRole.LANDLORD ? 'text-brand-secondary' : 'text-slate-400'
                                        }`} />
                                    <div className={`font-bold ${selectedRole === UserRole.LANDLORD ? 'text-brand-secondary' : 'text-slate-700'
                                        }`}>
                                        Bailleur
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">Je propose des logements</div>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                type="text"
                                label="Nom complet"
                                placeholder="Jean Dupont"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />

                            <Input
                                type="email"
                                label="Adresse email"
                                placeholder="votre@email.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                            />

                            <Input
                                type="tel"
                                label="Numéro de téléphone"
                                placeholder="690 00 00 00"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

                            <Input
                                type="password"
                                label="Confirmer le mot de passe"
                                placeholder="••••••••"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                required
                            />

                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    required
                                    className="mt-1 rounded border-slate-300 text-brand-primary focus:ring-brand-primary/20"
                                />
                                <label className="text-sm text-slate-600 font-medium">
                                    J'accepte les{" "}
                                    <Link href="/terms" className="text-brand-primary font-semibold hover:underline">
                                        conditions d'utilisation
                                    </Link>{" "}
                                    et la{" "}
                                    <Link href="/privacy" className="text-brand-primary font-semibold hover:underline">
                                        politique de confidentialité
                                    </Link>
                                </label>
                            </div>

                            <Button type="submit" variant="primary" fullWidth size="lg" className="h-14 rounded-2xl font-bold text-base">
                                Créer mon compte
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                            <p className="text-slate-600 font-medium">
                                Déjà un compte ?{" "}
                                <Link href="/login" className="text-brand-primary font-bold hover:underline">
                                    Se connecter
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Demo Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-sm text-blue-800 text-center font-medium">
                            💡 <strong>Mode démo</strong> : Choisissez votre rôle et inscrivez-vous. Vous serez redirigé vers le dashboard correspondant.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
