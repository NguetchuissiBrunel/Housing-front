import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-16 mt-auto">
            <div className="container space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-brand-secondary">Logement</h3>
                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            Votre partenaire de confiance pour trouver le logement étudiant idéal. Nous simplifion votre recherche pour que vous puissiez vous concentrer sur vos études.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" aria-label="Facebook" className="p-2 bg-slate-800 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Twitter" className="p-2 bg-slate-800 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="p-2 bg-slate-800 rounded-full hover:bg-brand-primary hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li><Link href="/search" className="text-white/60 hover:text-white transition-colors">Explorer</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-white transition-colors">À propos</Link></li>
                            <li><Link href="/contact" className="text-white/60 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/blog" className="text-white/60 hover:text-white transition-colors">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/faq" className="text-white/60 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/terms" className="text-white/60 hover:text-white transition-colors">Conditions d&apos;utilisation</Link></li>
                            <li><Link href="/privacy" className="text-white/60 hover:text-white transition-colors">Confidentialité</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white">Contact</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-brand-secondary" />
                                <span>support@logement.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-brand-secondary" />
                                <span>+237 600 000 000</span>
                            </li>
                            <li className="flex items-center gap-3 text-slate-400">
                                <MapPin className="w-5 h-5 text-brand-secondary" />
                                <span>Yaoundé, Cameroun</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Logement. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}
