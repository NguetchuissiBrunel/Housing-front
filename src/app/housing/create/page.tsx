"use client";

import { useState } from "react";
import {
    Building2, MapPin, DollarSign, Image as ImageIcon,
    Plus, Check, ChevronRight, LayoutGrid, Info, HelpCircle,
    ShieldCheck, Zap, BedDouble, GraduationCap, X, Loader2,
    Sparkles, Camera
} from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { housingService } from "@/services/housingService";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CreateHousingPage() {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        title: "",
        type: "STUDIO",
        description: "",
        address: "",
        city: "Yaoundé",
        rentPrice: "",
        universityDistanceMinutes: "",
        isFurnished: false,
    });

    const router = useRouter();
    const totalSteps = 4;

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const housing = await housingService.createHousing({
                ...formData,
                rentPrice: parseFloat(formData.rentPrice),
                universityDistanceMinutes: parseInt(formData.universityDistanceMinutes)
            } as any);

            if (files.length > 0) {
                await housingService.uploadImages(housing.id, files);
            }

            toast.success("Annonce publiée avec succès !");
            setStep(5); // Success step
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Échec de la publication de l'annonce.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-slate-50 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-primary/5 blur-[120px] rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-secondary/5 blur-[100px] rounded-full -ml-16 -mb-16" />

            <div className="container max-w-4xl mx-auto relative z-10">
                {/* Progress Bar */}
                {step <= totalSteps && (
                    <div className="mb-12 space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h1 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Étape {step} sur {totalSteps}</h1>
                                <p className="text-2xl font-black text-slate-900 tracking-tight">
                                    {step === 1 ? 'Informations de base' :
                                        step === 2 ? 'Localisation & Prix' :
                                            step === 3 ? 'Équipements & Photos' : 'Confirmation'}
                                </p>
                            </div>
                            <span className="text-4xl font-black text-brand-primary/10 tracking-tighter">
                                {Math.round((step / totalSteps) * 100)}%
                            </span>
                        </div>
                        <div className="h-4 bg-white rounded-full overflow-hidden border border-slate-100 p-1 shadow-inner">
                            <div
                                className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out shadow-lg shadow-brand-primary/20"
                                style={{ width: `${(step / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden transition-all duration-500">
                    {step === 5 ? (
                        <div className="p-16 md:p-24 text-center space-y-10 animate-in fade-in zoom-in duration-700">
                            <div className="w-28 h-28 bg-brand-secondary rounded-[32px] flex items-center justify-center text-white mx-auto shadow-2xl shadow-brand-secondary/30">
                                <Check className="w-14 h-14 stroke-[3px]" />
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter">Magnifique !</h2>
                                <p className="text-slate-500 text-lg font-medium max-w-md mx-auto leading-loose">
                                    Votre logement a été publié. Il sera visible par les étudiants après une rapide vérification par notre équipe.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                                <Link href="/dashboard">
                                    <Button variant="primary" size="lg" className="rounded-2xl px-12 h-16 text-xs font-black uppercase tracking-widest shadow-xl shadow-brand-primary/20">Accéder au Dashboard</Button>
                                </Link>
                                <Link href="/">
                                    <Button variant="outline" size="lg" className="rounded-2xl px-12 h-16 text-xs font-black uppercase tracking-widest border-2">Retour Accueil</Button>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="divide-y divide-slate-50">
                            {/* Step Content */}
                            <div className="p-10 md:p-16 space-y-12 min-h-[550px]">
                                {step === 1 && (
                                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4 md:col-span-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Titre de l&apos;annonce</label>
                                                <input
                                                    required
                                                    type="text"
                                                    placeholder="ex: Studio moderne à 2min de l'université"
                                                    className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-primary rounded-[20px] py-5 px-8 text-slate-900 placeholder:text-slate-300 outline-none transition-all font-bold text-lg"
                                                    value={formData.title}
                                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Type de logement</label>
                                                <div className="grid grid-cols-3 gap-3">
                                                    {['ROOM', 'STUDIO', 'APARTMENT'].map(t => (
                                                        <button
                                                            key={t}
                                                            type="button"
                                                            onClick={() => setFormData({ ...formData, type: t })}
                                                            className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 transition-all ${formData.type === t ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-slate-50 bg-slate-50 text-slate-500'
                                                                }`}
                                                        >
                                                            {t === 'ROOM' ? 'Chambre' : t === 'STUDIO' ? 'Studio' : 'Appart'}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Ville</label>
                                                <select
                                                    className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-primary rounded-[20px] py-5 px-8 text-slate-900 outline-none transition-all font-bold appearance-none cursor-pointer"
                                                    value={formData.city}
                                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                >
                                                    <option value="Yaoundé">Yaoundé</option>
                                                    <option value="Douala">Douala</option>
                                                    <option value="Dschang">Dschang</option>
                                                    <option value="Buea">Buea</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Description détaillée</label>
                                            <textarea
                                                rows={5}
                                                placeholder="Partagez les avantages de votre logement (sécurité, calme, proximité...)"
                                                className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-primary rounded-[30px] py-6 px-8 text-slate-900 placeholder:text-slate-300 outline-none transition-all font-medium leading-relaxed resize-none"
                                                value={formData.description}
                                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4 md:col-span-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Adresse ou Quartier</label>
                                                <div className="relative group">
                                                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-brand-primary transition-colors" />
                                                    <input
                                                        required
                                                        type="text"
                                                        placeholder="ex: Quartier Melen, Yaoundé"
                                                        className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-primary rounded-[20px] py-5 pl-16 pr-8 text-slate-900 placeholder:text-slate-300 outline-none transition-all font-bold text-lg"
                                                        value={formData.address}
                                                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Loyer Mensuel (FCFA)</label>
                                                <div className="relative group">
                                                    <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300 group-focus-within:text-brand-secondary transition-colors" />
                                                    <input
                                                        required
                                                        type="number"
                                                        placeholder="75000"
                                                        className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-secondary rounded-[20px] py-5 pl-16 pr-8 text-slate-900 font-black text-2xl outline-none transition-all"
                                                        value={formData.rentPrice}
                                                        onChange={e => setFormData({ ...formData, rentPrice: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Distance Univ. (min)</label>
                                                <input
                                                    required
                                                    type="number"
                                                    placeholder="Temps de marche"
                                                    className="w-full bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-brand-primary rounded-[20px] py-5 px-8 text-slate-900 font-black text-2xl outline-none transition-all"
                                                    value={formData.universityDistanceMinutes}
                                                    onChange={e => setFormData({ ...formData, universityDistanceMinutes: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {step === 3 && (
                                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            {[
                                                { label: 'Meublé', icon: BedDouble, key: 'isFurnished' },
                                                { label: 'Wi-Fi', icon: Zap },
                                                { label: 'Sécurité', icon: ShieldCheck },
                                                { label: 'Parking', icon: LayoutGrid },
                                            ].map((item) => (
                                                <label
                                                    key={item.label}
                                                    className={`flex flex-col items-center gap-4 p-8 rounded-[30px] border-2 cursor-pointer transition-all active:scale-95 group ${item.key && formData.isFurnished ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-50 bg-slate-50 hover:bg-white hover:shadow-xl'
                                                        }`}
                                                >
                                                    <item.icon className={`w-10 h-10 transition-colors ${item.key && formData.isFurnished ? 'text-brand-primary' : 'text-slate-200 group-hover:text-brand-primary'}`} />
                                                    <span className={`text-[9px] font-black uppercase tracking-widest ${item.key && formData.isFurnished ? 'text-brand-primary' : 'text-slate-400'}`}>{item.label}</span>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={item.key ? (formData as any)[item.key] : false}
                                                        onChange={() => item.key && setFormData({ ...formData, [item.key]: !(formData as any)[item.key] })}
                                                    />
                                                </label>
                                            ))}
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between ml-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Photos du logement</label>
                                                <span className="text-[10px] font-bold text-brand-primary">{files.length} fichiers sélectionnés</span>
                                            </div>
                                            <label className="block border-4 border-dashed border-slate-100 rounded-[40px] p-16 text-center space-y-4 hover:border-brand-primary/20 hover:bg-brand-primary/[0.02] transition-all cursor-pointer group relative">
                                                <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                                                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-200 mx-auto group-hover:scale-110 group-hover:text-brand-primary group-hover:bg-brand-primary/10 transition-all duration-700">
                                                    <Camera className="w-12 h-12" />
                                                </div>
                                                <div className="space-y-1">
                                                    <p className="text-slate-900 font-black text-xl">Ajouter des photos</p>
                                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em]">Glisser-déposer ou cliquer pour parcourir</p>
                                                </div>
                                                {files.length > 0 && (
                                                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-[40px] flex items-center justify-center gap-2">
                                                        <Plus className="w-8 h-8 text-brand-primary" />
                                                        <span className="text-lg font-black text-slate-900 uppercase tracking-widest">{files.length} Photos ajoutées</span>
                                                    </div>
                                                )}
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {step === 4 && (
                                    <div className="space-y-10 animate-in slide-in-from-right-8 duration-700">
                                        <div className="bg-slate-950 rounded-[40px] p-10 md:p-14 text-white space-y-12 relative overflow-hidden group shadow-2xl shadow-slate-900/30">
                                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:rotate-12 transition-transform duration-1000">
                                                <Sparkles className="w-64 h-64" />
                                            </div>

                                            <div className="space-y-6 relative z-10">
                                                <h3 className="text-4xl font-black tracking-tighter leading-tight max-w-lg">{formData.title || 'Studio Moderne'}</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    <span className="bg-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">{formData.type}</span>
                                                    <span className="bg-white/10 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/10">{formData.city.toUpperCase()}</span>
                                                    {formData.isFurnished && <span className="bg-brand-secondary/20 text-brand-secondary px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-brand-secondary/20">MEUBLÉ</span>}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-12 relative z-10 pt-10 border-t border-white/10">
                                                <div className="space-y-2">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Loyer Mensuel</div>
                                                    <div className="text-4xl font-black text-brand-secondary tracking-tighter">
                                                        {parseFloat(formData.rentPrice || "0").toLocaleString()} <span className="text-xs uppercase tracking-widest ml-1">FCFA</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Distance Univ.</div>
                                                    <div className="text-4xl font-black tracking-tighter">
                                                        {formData.universityDistanceMinutes || "0"} <span className="text-xs uppercase tracking-widest ml-1">MIN</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-5 p-8 bg-brand-primary/[0.03] rounded-[30px] border border-brand-primary/10">
                                            <Info className="w-8 h-8 text-brand-primary shrink-0" />
                                            <p className="text-sm text-slate-600 font-medium leading-loose italic">
                                                En publiant cette annonce, vous acceptez nos conditions et certifiez l&apos;exactitude des informations. Un agent de terrain vérifiera le logement prochainement.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Footer Actions */}
                            <div className="p-10 bg-slate-50/50 flex flex-col sm:flex-row justify-between gap-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[11px] disabled:opacity-0 border-2"
                                    onClick={prevStep}
                                    disabled={step === 1}
                                >
                                    Précédent
                                </Button>

                                {step < totalSteps ? (
                                    <Button
                                        type="button"
                                        variant="primary"
                                        className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[11px] gap-3 shadow-xl shadow-brand-primary/20"
                                        onClick={nextStep}
                                    >
                                        Continuer <ChevronRight className="w-5 h-5" />
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        variant="secondary"
                                        className="rounded-2xl px-12 h-16 font-black uppercase tracking-widest text-[11px] gap-3 shadow-xl shadow-brand-secondary/20 disabled:opacity-50"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                <span>Publier mon annonce</span>
                                                <Sparkles className="w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
