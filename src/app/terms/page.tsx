import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white py-24">
                <div className="container text-center">
                    <FileText className="w-16 h-16 mx-auto mb-6" />
                    <h1 className="text-5xl font-bold mb-4">Conditions d'Utilisation</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Dernière mise à jour : Février 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Acceptation */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">1. Acceptation des Conditions</h2>
                        <p className="text-slate-600 leading-relaxed">
                            En accédant et en utilisant la plateforme Logement, vous acceptez d'être lié par ces conditions d'utilisation.
                            Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                        </p>
                    </section>

                    {/* Service */}
                    <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">2. Description du Service</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            Logement est une plateforme en ligne qui met en relation des étudiants à la recherche de logements
                            avec des propriétaires au Cameroun. Nous fournissons :
                        </p>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0" />
                                <span>Un moteur de recherche de logements</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0" />
                                <span>Un système de vérification des propriétaires et logements</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0" />
                                <span>Un espace de communication entre étudiants et propriétaires</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="w-5 h-5 text-brand-secondary mt-0.5 shrink-0" />
                                <span>Un tableau de bord pour gérer vos réservations</span>
                            </li>
                        </ul>
                    </section>

                    {/* Compte utilisateur */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">3. Compte Utilisateur</h2>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Création de compte :</strong> Vous devez créer un compte pour accéder à certaines fonctionnalités.
                                Vous vous engagez à fournir des informations exactes et à jour.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Sécurité :</strong> Vous êtes responsable de la confidentialité de votre mot de passe
                                et de toutes les activités effectuées sous votre compte.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Suspension :</strong> Nous nous réservons le droit de suspendre ou de supprimer
                                votre compte en cas de violation de ces conditions.
                            </p>
                        </div>
                    </section>

                    {/* Responsabilités */}
                    <section className="bg-amber-50 rounded-3xl p-8 border border-amber-200">
                        <div className="flex items-center gap-3 mb-4">
                            <AlertCircle className="w-8 h-8 text-amber-600" />
                            <h2 className="text-3xl font-bold text-slate-900 m-0">4. Responsabilités</h2>
                        </div>
                        <div className="space-y-4 text-slate-600">
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Rôle de Logement :</strong> Nous sommes un intermédiaire entre étudiants et propriétaires.
                                Nous ne sommes pas partie aux contrats de location conclus entre vous et les propriétaires.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Vérification :</strong> Bien que nous vérifions les propriétaires et logements,
                                nous vous encourageons à effectuer vos propres vérifications avant toute réservation.
                            </p>
                            <p className="leading-relaxed">
                                <strong className="text-slate-900">Litiges :</strong> En cas de litige avec un propriétaire, vous devez le résoudre directement avec lui.
                                Nous pouvons faciliter la communication mais ne sommes pas responsables des différends.
                            </p>
                        </div>
                    </section>

                    {/* Utilisation acceptable */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">5. Utilisation Acceptable</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">Vous vous engagez à ne pas :</p>
                        <ul className="space-y-2 text-slate-600">
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>Publier du contenu faux, trompeur ou illégal</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>Usurper l'identité d'une autre personne</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>Harceler, menacer ou intimider d'autres utilisateurs</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>Tenter de contourner les mesures de sécurité de la plateforme</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-500 mt-1">✗</span>
                                <span>Utiliser la plateforme à des fins commerciales non autorisées</span>
                            </li>
                        </ul>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">6. Propriété Intellectuelle</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Tous les contenus de la plateforme (textes, images, logos, code source) sont la propriété de Logement
                            ou de ses partenaires et sont protégés par les lois sur la propriété intellectuelle.
                            Toute reproduction non autorisée est interdite.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">7. Modifications des Conditions</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Nous nous réservons le droit de modifier ces conditions à tout moment.
                            Les modifications entreront en vigueur dès leur publication sur la plateforme.
                            Votre utilisation continue du service après les modifications constitue votre acceptation des nouvelles conditions.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 text-center">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Questions ?</h2>
                        <p className="text-slate-600 mb-6">
                            Pour toute question concernant ces conditions d'utilisation, contactez-nous à :
                        </p>
                        <p className="text-lg font-semibold text-brand-primary mb-2">legal@logement.cm</p>
                        <a href="/contact" className="inline-block px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary-dark transition-colors mt-4">
                            Nous contacter
                        </a>
                    </section>
                </div>
            </div>
        </div>
    );
}
