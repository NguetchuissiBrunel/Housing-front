import { Shield, Eye, Lock, Database, UserCheck, Mail } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            {/* Hero */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-24">
                <div className="container text-center">
                    <Shield className="w-16 h-16 mx-auto mb-6 text-brand-secondary" />
                    <h1 className="text-5xl font-bold mb-4">Politique de Confidentialité</h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto">
                        Dernière mise à jour : Février 2026
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container py-20">
                <div className="max-w-4xl mx-auto prose prose-slate prose-lg">
                    <div className="space-y-12">
                        {/* Introduction */}
                        <section>
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Introduction</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Chez Logement, nous prenons la protection de vos données personnelles très au sérieux.
                                Cette politique de confidentialité explique comment nous collectons, utilisons, partageons
                                et protégeons vos informations lorsque vous utilisez notre plateforme.
                            </p>
                        </section>

                        {/* Données collectées */}
                        <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                            <div className="flex items-center gap-3 mb-4">
                                <Database className="w-8 h-8 text-brand-primary" />
                                <h2 className="text-3xl font-bold text-slate-900 m-0">Données Collectées</h2>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Informations d'inscription</h3>
                                    <p className="text-slate-600">Nom, prénom, adresse email, numéro de téléphone</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Données de navigation</h3>
                                    <p className="text-slate-600">Adresse IP, type de navigateur, pages visitées, durée de visite</p>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Informations de réservation</h3>
                                    <p className="text-slate-600">Logements consultés, réservations effectuées, préférences</p>
                                </div>
                            </div>
                        </section>

                        {/* Utilisation */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Eye className="w-8 h-8 text-brand-secondary" />
                                <h2 className="text-3xl font-bold text-slate-900">Utilisation des Données</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Nous utilisons vos données personnelles pour :
                            </p>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-primary mt-1">•</span>
                                    <span>Créer et gérer votre compte utilisateur</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-primary mt-1">•</span>
                                    <span>Faciliter la mise en relation avec les propriétaires</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-primary mt-1">•</span>
                                    <span>Améliorer nos services et votre expérience utilisateur</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-primary mt-1">•</span>
                                    <span>Vous envoyer des notifications importantes concernant votre compte</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-primary mt-1">•</span>
                                    <span>Prévenir la fraude et assurer la sécurité de la plateforme</span>
                                </li>
                            </ul>
                        </section>

                        {/* Partage */}
                        <section className="bg-blue-50 rounded-3xl p-8 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <UserCheck className="w-8 h-8 text-brand-accent" />
                                <h2 className="text-3xl font-bold text-slate-900 m-0">Partage des Données</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos informations uniquement dans les cas suivants :
                            </p>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span><strong>Avec les propriétaires</strong> : Vos coordonnées sont partagées lorsque vous effectuez une réservation</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span><strong>Prestataires de services</strong> : Hébergement, analytics, support client (sous contrat de confidentialité)</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-brand-accent mt-1">•</span>
                                    <span><strong>Obligations légales</strong> : Si requis par la loi ou pour protéger nos droits</span>
                                </li>
                            </ul>
                        </section>

                        {/* Sécurité */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <Lock className="w-8 h-8 text-brand-primary" />
                                <h2 className="text-3xl font-bold text-slate-900">Sécurité</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées
                                pour protéger vos données contre tout accès non autorisé, modification, divulgation ou destruction.
                                Cela inclut le chiffrement des données sensibles, l'accès restreint aux données personnelles,
                                et des audits de sécurité réguliers.
                            </p>
                        </section>

                        {/* Vos droits */}
                        <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200">
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Vos Droits</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Vous disposez des droits suivants concernant vos données personnelles :
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-1">Droit d'accès</h3>
                                    <p className="text-sm text-slate-600">Consulter vos données personnelles</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-1">Droit de rectification</h3>
                                    <p className="text-sm text-slate-600">Corriger vos informations</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-1">Droit à l'effacement</h3>
                                    <p className="text-sm text-slate-600">Supprimer votre compte et vos données</p>
                                </div>
                                <div className="p-4 bg-white rounded-xl border border-slate-200">
                                    <h3 className="font-bold text-slate-900 mb-1">Droit d'opposition</h3>
                                    <p className="text-sm text-slate-600">Refuser certains traitements</p>
                                </div>
                            </div>
                        </section>

                        {/* Contact */}
                        <section className="bg-gradient-to-br from-brand-primary to-brand-primary-dark text-white rounded-3xl p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-8 h-8" />
                                <h2 className="text-3xl font-bold m-0">Nous Contacter</h2>
                            </div>
                            <p className="text-white/90 leading-relaxed mb-4">
                                Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits,
                                vous pouvez nous contacter à :
                            </p>
                            <div className="space-y-2">
                                <p className="font-semibold">Email : privacy@logement.cm</p>
                                <p className="font-semibold">Adresse : Yaoundé, Cameroun</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
