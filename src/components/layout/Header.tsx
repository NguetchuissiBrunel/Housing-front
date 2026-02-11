"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Search, Info, Phone, LogIn, UserPlus, Menu, X, LogOut, LayoutDashboard, MessageSquare, ChevronDown, User } from 'lucide-react';
import Button from '../ui/Button';
import { clearCurrentUser } from '@/lib/auth';
import { logout, getSession } from '@/app/actions/auth-actions';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Pages avec fond sombre (Hero dark)
    const darkPages = ['/'];
    const isDarkPage = darkPages.includes(pathname);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            setUser(session);
            setIsLoaded(true);
        };
        checkSession();
    }, [pathname]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        await logout();
        clearCurrentUser();
        setUser(null);
        router.push('/');
        router.refresh();
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
                    {isLoaded && (
                        <>
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link href="/messages" className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                        {unreadCount > 0 && (
                                            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                                                {unreadCount}
                                            </span>
                                        )}
                                    </Link>

                                    <div className="relative">
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 p-1 pl-3 pr-1 bg-slate-100 rounded-full border border-slate-200 hover:bg-slate-200 transition-colors"
                                        >
                                            <span className="text-sm font-bold text-slate-700">{user.name || user.email.split('@')[0]}</span>
                                            <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                                {user.name?.charAt(0) || user.email.charAt(0)}
                                            </div>
                                            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isUserMenuOpen && (
                                            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2">
                                                <Link
                                                    href={user.role === 'LANDLORD' ? '/landlord/dashboard' : '/dashboard'}
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <LayoutDashboard className="w-4 h-4" />
                                                    Mon Dashboard
                                                </Link>
                                                <Link
                                                    href="/settings"
                                                    onClick={() => setIsUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                                                >
                                                    <User className="w-4 h-4" />
                                                    Paramètres
                                                </Link>
                                                <div className="h-px bg-slate-100 my-1"></div>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Déconnexion
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
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
                    {user ? (
                        <>
                            <Link href="/messages" className="w-full relative" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs justify-start">
                                    <MessageSquare className="w-5 h-5 mr-3" /> Messages
                                    {unreadCount > 0 && (
                                        <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                                            {unreadCount}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                            <Link
                                href={user.role === 'LANDLORD' ? '/landlord/dashboard' : '/dashboard'}
                                className="w-full"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
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
                            <Link href="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="outline" size="md" fullWidth className="rounded-2xl h-14 font-black uppercase tracking-widest text-xs">
                                    <LogIn className="w-5 h-5 mr-3" /> Connexion
                                </Button>
                            </Link>
                            <Link href="/register" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
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
