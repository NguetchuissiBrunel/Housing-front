import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    ...props
}: ButtonProps) {
    const variants = {
        primary: 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-sm border-transparent',
        secondary: 'bg-brand-secondary text-white hover:bg-brand-secondary/90 shadow-sm border-transparent',
        outline: 'bg-transparent border-slate-200 text-slate-700 hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/5',
        ghost: 'bg-transparent text-slate-700 hover:bg-slate-50 hover:text-brand-primary border-transparent',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 border disabled:opacity-60 disabled:cursor-not-allowed active:scale-95',
                variants[variant],
                sizes[size],
                fullWidth ? 'w-full' : '',
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
