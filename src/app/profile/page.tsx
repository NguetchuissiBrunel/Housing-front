"use client";

import { useState, useEffect } from "react";
import {
    User as UserIcon, Mail, Phone, MapPin, Camera,
    ShieldCheck, Key, LogOut, ChevronRight,
    Building2, FileText, Upload, AlertCircle, Settings, Loader2
} from "lucide-react";
import Button from "@/components/ui/Button";
import { getSession, updateProfile, logout } from "@/app/actions/auth-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { clearCurrentUser } from "@/lib/auth";

export default function ProfilePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const session = await getSession();
            if (session) {
                setUser(session);
                setFormData({
                    name: session.name || "",
                    email: session.email || "",
                    phone: session.phone || "",
                });
            } else {
                router.push("/login");
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [router]);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const result = await updateProfile({
                name: formData.name,
                phone: formData.phone,
            });

            if (result.success) {
                toast.success("Profil mis à jour avec succès");
                setUser(result.data);
            } else {
                toast.error(result.error || "Erreur lors de la mise à jour");
            }
        } catch (error) {
            toast.error("Une erreur s'est produite");
        } finally {
            setIsSaving(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        clearCurrentUser();
        router.push("/");
        router.refresh();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="container max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar - Navigation & Basic Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-sm text-center space-y-6">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 bg-slate-100 rounded-[40px] flex items-center justify-center text-slate-300 border-4 border-white shadow-xl overflow-hidden">
                                    <UserIcon className="w-16 h-16" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-3 bg-brand-primary text-white rounded-2xl shadow-lg transform group-hover:scale-110 transition-transform">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-1">
                                <h2 className="text-2xl font-black text-slate-900">{user.name || "Utilisateur"}</h2>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                    {user.role === "LANDLORD" ? "Bailleur Vérifié" : "Étudiant"}
                                </p>
                            </div>

                            <div className="pt-6 border-t border-slate-50 flex flex-col gap-2">
                                <Button variant="ghost" className="justify-start gap-4 h-14 rounded-2xl bg-slate-50 text-brand-primary font-black uppercase tracking-widest text-[10px]">
                                    <UserIcon className="w-5 h-5" /> Mon Profil
                                </Button>
                                <Button variant="ghost" className="justify-start gap-4 h-14 rounded-2xl text-slate-500 hover:bg-slate-50 font-black uppercase tracking-widest text-[10px]">
                                    <Settings className="w-5 h-5" /> Paramètres
                                </Button>
                                <Button
                                    onClick={handleLogout}
                                    variant="ghost"
                                    className="justify-start gap-4 h-14 rounded-2xl text-red-500 hover:bg-red-50 font-black uppercase tracking-widest text-[10px]"
                                >
                                    <LogOut className="w-5 h-5" /> Déconnexion
                                </Button>
                            </div>
                        </div>

                        {user.role === "LANDLORD" && (
                            <div className="bg-slate-900 rounded-[40px] p-8 text-white space-y-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <ShieldCheck className="w-32 h-32" />
                                </div>
                                <div className="space-y-2 relative z-10">
                                    <h3 className="text-xl font-black">Vérification</h3>
                                    <p className="text-slate-400 text-sm font-medium leading-relaxed opacity-80">
                                        Votre compte est certifié. Vos annonces inspirent 2x plus confiance.
                                    </p>
                                </div>
                                <Button variant="secondary" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-[10px]">
                                    Voir Badge de Confiance
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Content - Forms */}
                    <div className="lg:col-span-8 space-y-8">

                        {/* Personal Information */}
                        <form onSubmit={handleUpdateProfile} className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Informations Personnelles</h2>
                                <p className="text-slate-500 font-medium">Mettez à jour vos informations de contact.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Nom complet</label>
                                    <div className="relative group">
                                        <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary rounded-2xl py-4 pl-14 pr-6 text-slate-900 font-bold outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled
                                            className="w-full bg-slate-50 border-none ring-1 ring-slate-200 rounded-2xl py-4 pl-14 pr-6 text-slate-500 font-bold outline-none transition-all cursor-not-allowed opacity-70"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest ml-1">Téléphone</label>
                                    <div className="relative group">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-primary transition-colors" />
                                        <input
                                            type="text"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+237 6XX XXX XXX"
                                            className="w-full bg-slate-50 border-none ring-1 ring-slate-200 focus:ring-2 focus:ring-brand-primary rounded-2xl py-4 pl-14 pr-6 text-slate-900 font-bold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Button
                                type="submit"
                                variant="primary"
                                className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[11px] shadow-xl shadow-brand-primary/20"
                                disabled={isSaving}
                            >
                                {isSaving ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                                Sauvegarder les modifications
                            </Button>
                        </form>

                        {/* Security */}
                        <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Sécurité</h2>
                                <p className="text-slate-500 font-medium">Gérez votre mot de passe et vos accès.</p>
                            </div>
                            <div className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] border border-slate-100 group cursor-pointer hover:border-brand-primary/20 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-all">
                                        <Key className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900">Mot de passe</div>
                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Derniere modification il y a 3 mois</div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </div>
                        </div>

                        {/* Verification Documents for Landlords */}
                        {user.role === "LANDLORD" && (
                            <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm space-y-10">
                                <div className="space-y-2">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Documents de Vérification</h2>
                                    <p className="text-slate-500 font-medium">Certifiez votre identité pour obtenir le badge de confiance.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-8 border-4 border-dashed border-slate-100 rounded-[40px] space-y-4 text-center hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group cursor-pointer">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto group-hover:scale-110 group-hover:text-brand-primary transition-all duration-500">
                                            <Upload className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-black text-slate-900">Carte d&apos;Identité</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recto / Verso (PNG, JPG)</div>
                                        </div>
                                    </div>
                                    <div className="p-8 border-4 border-dashed border-slate-100 rounded-[40px] space-y-4 text-center hover:border-brand-primary/20 hover:bg-brand-primary/5 transition-all group cursor-pointer">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto group-hover:scale-110 group-hover:text-brand-primary transition-all duration-500">
                                            <FileText className="w-8 h-8" />
                                        </div>
                                        <div className="space-y-1">
                                            <div className="font-black text-slate-900">Titre de Propriété</div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Copie certifiée (PDF)</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-3xl border border-amber-100">
                                    <AlertCircle className="w-6 h-6 text-amber-600 shrink-0" />
                                    <p className="text-sm text-amber-800 font-medium leading-relaxed italic">
                                        Vos documents sont traités en toute confidentialité et uniquement utilisés pour la certification de votre compte.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
