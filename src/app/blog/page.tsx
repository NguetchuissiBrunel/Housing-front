import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "10 Conseils pour Trouver le Logement Étudiant Idéal à Yaoundé",
            excerpt: "Découvrez nos meilleurs conseils pour dénicher le logement parfait près de votre université.",
            author: "Marie Kamga",
            date: "2026-01-28",
            category: "Conseils",
            image: "/images/analog-landscape-city-with-buildings.jpg",
            readTime: "5 min"
        },
        {
            id: 2,
            title: "Budget Étudiant : Comment Gérer son Loyer au Cameroun",
            excerpt: "Astuces pratiques pour optimiser votre budget logement et éviter les mauvaises surprises.",
            author: "Jean Kamga",
            date: "2026-01-25",
            category: "Finance",
            image: "/images/still-life-keys-new-home.jpg",
            readTime: "7 min"
        },
        {
            id: 3,
            title: "Les Quartiers Étudiants les Plus Populaires de Yaoundé",
            excerpt: "Guide complet des meilleurs quartiers pour les étudiants : Melen, Ngoa-Ekelle, Essos et plus.",
            author: "Paul Mbida",
            date: "2026-01-20",
            category: "Guide",
            image: "/images/new-home-keys-plan-table-with-defocused-couple.jpg",
            readTime: "6 min"
        },
        {
            id: 4,
            title: "Checklist : Que Vérifier Avant de Signer un Bail ?",
            excerpt: "Liste complète des points à vérifier avant de vous engager dans une location.",
            author: "Marie Kamga",
            date: "2026-01-15",
            category: "Conseils",
            image: "/images/black-businessman-happy-expression.jpg",
            readTime: "4 min"
        }
    ];

    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-24">
                <div className="container text-center">
                    <BookOpen className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-5xl font-bold mb-4">Blog Logement</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Conseils, guides et actualités pour les étudiants à la recherche de logement
                    </p>
                </div>
            </div>

            {/* Blog Posts */}
            <div className="container py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {posts.map((post) => (
                        <article key={post.id} className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden hover:shadow-xl transition-all group">
                            <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-8 space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-lg font-bold">
                                        {post.category}
                                    </span>
                                    <span className="text-slate-400 flex items-center gap-1">
                                        <Calendar className="w-4 h-4" />
                                        {new Date(post.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">
                                    {post.title}
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                        <User className="w-4 h-4" />
                                        <span>{post.author}</span>
                                        <span>•</span>
                                        <span>{post.readTime} de lecture</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="text-brand-primary font-bold gap-2 group-hover:gap-3 transition-all">
                                        Lire <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Coming Soon */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-16 text-center border border-slate-200">
                    <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-6" />
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Plus d'articles bientôt !</h3>
                    <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto">
                        Nous publions régulièrement de nouveaux articles pour vous aider dans votre recherche de logement.
                        Abonnez-vous à notre newsletter pour ne rien manquer.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Votre email"
                            className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
                        />
                        <Button variant="primary" className="px-8 py-4 rounded-2xl font-bold whitespace-nowrap">
                            S'abonner
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
