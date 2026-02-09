import Hero from "@/components/home/Hero";
import { ShieldCheck, Zap, CircleDollarSign, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";
import PropertyCard from "@/components/housing/PropertyCard";
import { getProperties } from "@/app/actions/property-actions";

export default async function Home() {
  // Get properties from database
  const result = await getProperties();
  const properties = (result.success && result.data) ? (result.data as any[]) : [];

  // Get first 3 properties for featured section
  const featuredProperties = properties.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />

      {/* Featured Section */}
      <section className="py-24">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Logements Populaires</h2>
              <p className="text-slate-500 text-lg font-medium">Découvrez les offres les plus prisées par les étudiants.</p>
            </div>
            <Link href="/search">
              <Button variant="outline" size="md" className="gap-2 rounded-xl text-xs font-bold px-6">
                Voir tout <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pourquoi nous faire confiance?</h2>
            <p className="text-slate-500 text-lg font-medium">Une expérience simplifiée pour les étudiants.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: ShieldCheck,
                title: "Sécurité Garantie",
                desc: "Tous nos propriétaires et logements sont vérifiés manuellement par notre équipe.",
                color: "text-brand-primary",
                bg: "bg-brand-primary/5"
              },
              {
                icon: Zap,
                title: "Rapide & Simple",
                desc: "Réservez votre logement en quelques minutes, sans paperasse inutile.",
                color: "text-brand-secondary",
                bg: "bg-brand-secondary/5"
              },
              {
                icon: CircleDollarSign,
                title: "Zéro Frais",
                desc: "Notre service est 100% gratuit pour les étudiants au Cameroun.",
                color: "text-brand-accent",
                bg: "bg-brand-accent/5"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl border border-slate-100 hover:border-slate-200 transition-all text-center">
                <div className={`w-16 h-16 ${feature.bg} ${feature.color} flex items-center justify-center rounded-2xl mb-8 mx-auto`}>
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                <p className="text-slate-500 text-base leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="bg-gradient-to-br from-brand-primary to-brand-primary-dark rounded-[40px] p-12 md:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-primary/20">
            <div className="absolute inset-0 bg-[url('/images/analog-landscape-city-with-buildings.jpg')] opacity-10 bg-cover bg-center" />
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Prêt à trouver votre futur logement ?</h2>
              <p className="text-blue-100/80 text-lg md:text-xl font-medium">Rejoignez des milliers d&apos;étudiants qui nous font déjà confiance.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/register">
                  <Button variant="secondary" size="lg" className="px-12 py-6 h-auto font-bold text-base rounded-2xl bg-white text-brand-primary hover:bg-slate-50">Créer mon compte</Button>
                </Link>
                <Link href="/search">
                  <Button variant="outline" size="lg" className="px-12 py-6 h-auto font-bold text-base border-white/20 text-white hover:bg-white/10 hover:text-white rounded-2xl">Parcourir les offres</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
