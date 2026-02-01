import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
    return (
        <div
            className={cn(
                "bg-white rounded-2xl border border-slate-200 overflow-hidden",
                hover && "hover:border-brand-primary/30 hover:shadow-soft transition-all duration-300",
                className
            )}
        >
            {children}
        </div>
    );
}

export function CardImage({ src, alt, className, children }: { src: string; alt: string; className?: string; children?: React.ReactNode }) {
    return (
        <div className={cn("relative bg-slate-100 overflow-hidden", className)}>
            <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
            />
            {children}
        </div>
    );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("p-6", className)}>{children}</div>;
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
    return <h3 className={cn("text-xl font-bold text-slate-900", className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={cn("text-slate-500 text-sm leading-relaxed", className)}>{children}</p>;
}

export function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
    return <div className={cn("flex items-center justify-between pt-5 border-t border-slate-100", className)}>{children}</div>;
}
