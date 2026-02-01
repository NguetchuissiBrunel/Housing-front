import { ShieldCheck, Users, Target, Award, Heart, Zap } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="/images/new-home-keys-plan-table-with-defocused-couple.jpg"
                        alt="Home"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-6">À propos de Logement</h1>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                        Nous facilitons la recherche de logement pour les étudiants au Cameroun depuis 2024.
                        Notre mission est de rendre l'accès au logement simple, sécurisé et accessible à tous.
                    </p>
                </div>
            </div>

            {/* Mission Section */}
            <div className="container py-20">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Notre Mission</h2>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Connecter les étudiants avec des logements de qualité, vérifiés et abordables.
                        Nous croyons que chaque étudiant mérite un chez-soi confortable pour réussir ses études.
                    </p>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        {
                            icon: ShieldCheck,
                            title: "Sécurité",
                            description: "Tous nos logements et propriétaires sont vérifiés manuellement par notre équipe.",
                            color: "text-brand-primary",
                            bg: "bg-brand-primary/5"
                        },
                        {
                            icon: Heart,
                            title: "Transparence",
                            description: "Pas de frais cachés, pas de commission. Notre service est 100% gratuit pour les étudiants.",
                            color: "text-brand-secondary",
                            bg: "bg-brand-secondary/5"
                        },
                        {
                            icon: Zap,
                            title: "Simplicité",
                            description: "Une plateforme intuitive pour trouver et réserver votre logement en quelques clics.",
                            color: "text-brand-accent",
                            bg: "bg-brand-accent/5"
                        }
                    ].map((value, i) => (
                        <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-soft hover:shadow-xl transition-all text-center">
                            <div className={`w-16 h-16 ${value.bg} ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                                <value.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{value.description}</p>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-[40px] p-12 md:p-16 text-white mb-20 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <img
                            src="/images/still-life-keys-new-home.jpg"
                            alt="Keys"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { value: "500+", label: "Logements" },
                            { value: "1000+", label: "Étudiants" },
                            { value: "50+", label: "Propriétaires" },
                            { value: "100%", label: "Satisfaction" }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div className="text-5xl font-bold mb-2">{stat.value}</div>
                                <div className="text-white/80 font-semibold uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">Notre Équipe</h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
                        Une équipe passionnée et dévouée pour vous offrir la meilleure expérience de recherche de logement.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Jean Kamga", role: "CEO & Fondateur", image: "/images/black-businessman-happy-expression.jpg" },
                            { name: "Marie Ngo", role: "Responsable Relations", image: "/images/black-businessman-happy-expression.jpg" },
                            { name: "Paul Mbida", role: "Support Client", image: "/images/black-businessman-happy-expression.jpg" }
                        ].map((member, i) => (
                            <div key={i} className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden hover:shadow-xl transition-all">
                                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                                    <p className="text-brand-primary font-semibold text-sm">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-slate-50 rounded-[40px] p-12 md:p-16 text-center border border-slate-200">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">Prêt à commencer ?</h2>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Rejoignez des milliers d'étudiants qui ont trouvé leur logement idéal avec nous.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/search">
                            <Button variant="primary" size="lg" className="px-12 py-4 rounded-2xl font-bold">
                                Explorer les logements
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="px-12 py-4 rounded-2xl font-bold">
                                Nous contacter
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
