import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ContactPage() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img
                        src="/images/analog-landscape-city-with-buildings.jpg"
                        alt="City"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="container relative z-10 text-center">
                    <h1 className="text-5xl font-bold mb-4">Contactez-nous</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Notre équipe est là pour répondre à toutes vos questions
                    </p>
                </div>
            </div>

            <div className="container py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Envoyez-nous un message</h2>
                        <form className="space-y-6">
                            <Input
                                type="text"
                                label="Nom complet"
                                placeholder="Jean Dupont"
                                required
                            />
                            <Input
                                type="email"
                                label="Email"
                                placeholder="votre@email.com"
                                required
                            />
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                                <textarea
                                    rows={6}
                                    placeholder="Décrivez votre demande..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
                                    required
                                />
                            </div>
                            <Button type="submit" variant="primary" size="lg" fullWidth className="h-14 rounded-2xl font-bold gap-2">
                                <Send className="w-5 h-5" />
                                Envoyer le message
                            </Button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Informations de contact</h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">
                                Nous sommes disponibles du lundi au vendredi de 8h à 18h pour vous accompagner dans votre recherche de logement.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                {
                                    icon: Mail,
                                    title: "Email",
                                    value: "support@logement.cm",
                                    color: "text-brand-primary"
                                },
                                {
                                    icon: Phone,
                                    title: "Téléphone",
                                    value: "+237 6 00 00 00 00",
                                    color: "text-brand-secondary"
                                },
                                {
                                    icon: MapPin,
                                    title: "Adresse",
                                    value: "Yaoundé, Cameroun",
                                    color: "text-brand-accent"
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className={`w-12 h-12 ${item.color} bg-white rounded-xl flex items-center justify-center shadow-soft`}>
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-1">{item.title}</div>
                                        <div className="text-lg font-bold text-slate-900">{item.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* FAQ Link */}
                        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100">
                            <MessageSquare className="w-12 h-12 text-brand-primary mb-4" />
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Questions fréquentes</h3>
                            <p className="text-slate-600 mb-4">
                                Consultez notre FAQ pour des réponses rapides aux questions courantes.
                            </p>
                            <Button variant="outline" className="rounded-xl">
                                Voir la FAQ
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
