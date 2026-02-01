import { ChevronDown } from "lucide-react";

export default function FAQPage() {
    const faqs = [
        {
            category: "Général",
            questions: [
                {
                    q: "Comment fonctionne Logement ?",
                    a: "Logement est une plateforme gratuite qui connecte les étudiants avec des propriétaires de logements vérifiés. Vous pouvez rechercher, filtrer et réserver des logements en quelques clics."
                },
                {
                    q: "Le service est-il vraiment gratuit ?",
                    a: "Oui, notre service est 100% gratuit pour les étudiants. Nous ne facturons aucune commission ni frais d'agence."
                },
                {
                    q: "Comment sont vérifiés les logements ?",
                    a: "Chaque logement et propriétaire est vérifié manuellement par notre équipe avant d'être publié sur la plateforme."
                }
            ]
        },
        {
            category: "Réservation",
            questions: [
                {
                    q: "Comment réserver un logement ?",
                    a: "Créez un compte, trouvez le logement qui vous convient, puis cliquez sur 'Réserver maintenant'. Vous pourrez ensuite contacter directement le propriétaire."
                },
                {
                    q: "Puis-je annuler une réservation ?",
                    a: "Oui, vous pouvez annuler une réservation depuis votre dashboard. Les conditions d'annulation dépendent de l'accord avec le propriétaire."
                },
                {
                    q: "Quel est le montant de la caution ?",
                    a: "La caution est généralement équivalente à 1 mois de loyer. Elle vous sera restituée à la fin de votre séjour si le logement est en bon état."
                }
            ]
        },
        {
            category: "Paiement",
            questions: [
                {
                    q: "Quels sont les modes de paiement acceptés ?",
                    a: "Les paiements se font directement avec le propriétaire. Les modes de paiement varient selon les propriétaires (virement, espèces, mobile money)."
                },
                {
                    q: "Dois-je payer en ligne ?",
                    a: "Non, les paiements se font directement avec le propriétaire. Notre plateforme ne gère pas les transactions financières."
                },
                {
                    q: "Y a-t-il des frais cachés ?",
                    a: "Non, nous sommes 100% transparents. Le prix affiché est le prix que vous payez au propriétaire, sans frais supplémentaires de notre part."
                }
            ]
        },
        {
            category: "Compte & Sécurité",
            questions: [
                {
                    q: "Comment créer un compte ?",
                    a: "Cliquez sur 'S'inscrire' en haut de la page, remplissez le formulaire avec vos informations, et validez votre email."
                },
                {
                    q: "Mes données sont-elles sécurisées ?",
                    a: "Oui, nous utilisons les dernières technologies de sécurité pour protéger vos données personnelles. Consultez notre politique de confidentialité pour plus de détails."
                },
                {
                    q: "Comment contacter le support ?",
                    a: "Vous pouvez nous contacter via la page Contact ou par email à support@logement.cm. Nous répondons sous 24h."
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-24">
                <div className="container text-center">
                    <h1 className="text-5xl font-bold mb-4">Questions Fréquentes</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Trouvez rapidement les réponses à vos questions
                    </p>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="container py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    {faqs.map((category, idx) => (
                        <div key={idx}>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 pb-3 border-b-2 border-brand-primary/20">
                                {category.category}
                            </h2>
                            <div className="space-y-4">
                                {category.questions.map((faq, qIdx) => (
                                    <details key={qIdx} className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-100 transition-colors">
                                            <h3 className="text-lg font-bold text-slate-900 pr-4">{faq.q}</h3>
                                            <ChevronDown className="w-5 h-5 text-brand-primary shrink-0 transition-transform group-open:rotate-180" />
                                        </summary>
                                        <div className="px-6 pb-6 pt-2">
                                            <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact CTA */}
                <div className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl border border-blue-100 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Vous ne trouvez pas votre réponse ?</h3>
                    <p className="text-slate-600 mb-6">Notre équipe est là pour vous aider</p>
                    <a href="/contact" className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary-dark transition-colors">
                        Nous contacter
                    </a>
                </div>
            </div>
        </div>
    );
}
