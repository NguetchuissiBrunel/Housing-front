"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Info, Phone, LogIn, UserPlus, Menu, X, LogOut, LayoutDashboard, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { getCurrentUser, clearCurrentUser, getDashboardUrl } from '@/lib/auth';
import { getUnreadCount } from '@/lib/mockData';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Initialize with null to match server-side rendering and avoid hydration mismatch
    const [currentUser, setCurrentUser] = useState<any | null>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const pathname = usePathname();
    const router = useRouter();

    // Pages avec fond sombre (Hero dark)
    const darkPages = ['/'];
    const isDarkPage = darkPages.includes(pathname);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        // Update user state on mount and route change
        // This ensures the initial render matches the server (null user)
        const user = getCurrentUser();
        setCurrentUser(user);
        if (user) {
            setUnreadCount(getUnreadCount(user.id));
        }
    }, [pathname]);

    const handleLogout = () => {
        clearCurrentUser();
        setCurrentUser(null);
        router.push('/');
    };

    // Sur pages sombres : transparent → blanc au scroll
    // Sur pages claires : toujours blanc
    const headerBg = isDarkPage
        ? (isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white/20' : 'bg-transparent')
        : 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-b border-white/20';

    // Texte blanc sur fond transparent (page sombre), texte sombre sur fond blanc
    const textColor = (isDarkPage && !isScrolled) ? 'text-white' : 'text-slate-900';

    return (
        <header className={`fixed top-0 left-0 right-0 h-20 z-[100] transition-all duration-500 ${headerBg}`}>
            <div className="container h-full flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2.5">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <Home className="w-6 h-6" />
                    </div>
                    <span className={`text-2xl font-black tracking-tight transition-colors duration-300 ${textColor}`}>
                        Logement
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {[
                        { name: 'Explorer', href: '/search', icon: Search },
                        { name: 'À propos', href: '/about', icon: Info },
                        { name: 'Contact', href: '/contact', icon: Phone },
                    ].map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-105 ${(isDarkPage && !isScrolled)
                                ? 'text-white/80 hover:text-white'
                                : 'text-slate-600 hover:text-brand-primary'
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-5">
                    {currentUser ? (
                        <>
                            {/* Messages with badge */}
                            <Link href="/messages" className="relative">
                                <Button variant="ghost" size="sm" className={`font-bold uppercase tracking-widest text-[11px] ${(isDarkPage && !isScrolled) ? 'text-white' : 'text-slate-700'}`}>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Messages
                                </Button>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                        {unreadCount}
                                    </span>
                                )}
                            </Link>
                            {/* Dashboard */}
                            <Link href={getDashboardUrl(currentUser.role)}>
                                <Button variant="ghost" size="sm" className={`font-bold uppercase tracking-widest text-[11px] ${(isDarkPage && !isScrolled) ? 'text-white' : 'text-slate-700'}`}>
                                    <LayoutDashboard className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Button>
                            </Link>
                            {/* Logout */}
                            <Button
                                onClick={handleLogout}
                                variant="primary"
                                size="sm"
                                className="rounded-xl px-6 py-2.5 font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-brand-primary/20"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Déconnexion
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button variant="ghost" size="sm" className={`font-bold uppercase tracking-widest text-[11px] ${(isDarkPage && !isScrolled) ? 'text-white' : 'text-slate-700'}`}>
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Connexion
                                </Button>
                            </Link>
                            <Link href="/register">
                                <Button variant="primary" size="sm" className="rounded-xl px-6 py-2.5 font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-brand-primary/20">
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    S&apos;inscrire
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`md:hidden p-2.5 rounded-xl transition-colors ${(isDarkPage && !isScrolled)
                        ? 'text-white bg-white/10'
                        : 'text-slate-900 bg-slate-100'
                        }`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-100 p-6 space-y-6 shadow-2xl transition-all duration-500 ease-in-out ${isMobileMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
                    }`}
            >
                <div className="grid grid-cols-1 gap-4">
                    <Link href="/search" className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center gap-4 active:scale-95 transition-transform">
                        <Search className="w-5 h-5 text-brand-primary" /> Explorer
                    </Link>
                    <Link href="/about" className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center gap-4 active:scale-95 transition-transform">
                        <Info className="w-5 h-5 text-brand-primary" /> À propos
                    </Link>
                    <Link href="/contact" className="p-4 bg-slate-50 rounded-2xl font-bold text-slate-700 flex items-center gap-4 active:scale-95 transition-transform">
                        <Phone className="w-5 h-5 text-brand-primary" /> Contact
                    </Link>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                    {currentUser ? (
                        <>
                            <Link href="/messages" className="w-full relative">
                                <Button variant="outline" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs justify-start">
                                    <MessageSquare className="w-5 h-5 mr-3" /> Messages
                                    {unreadCount > 0 && (
                                        <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                            <Link href={getDashboardUrl(currentUser.role)} className="w-full">
                                <Button variant="outline" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs">
                                    <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
                                </Button>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                variant="primary"
                                size="md"
                                fullWidth
                                className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20"
                            >
                                <LogOut className="w-5 h-5 mr-3" /> Déconnexion
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="w-full">
                                <Button variant="outline" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs">
                                    <LogIn className="w-5 h-5 mr-3" /> Connexion
                                </Button>
                            </Link>
                            <Link href="/register" className="w-full">
                                <Button variant="primary" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-primary/20">
                                    <UserPlus className="w-5 h-5 mr-3" /> S&apos;inscrire
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
