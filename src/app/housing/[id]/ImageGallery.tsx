"use client";

import { useState } from "react";
import Badge from "@/components/ui/Badge";

interface ImageGalleryProps {
    images: string[];
    title: string;
}

export default function ImageGallery({ images, title }: ImageGalleryProps) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="space-y-6">
            <div className="aspect-[16/9] w-full rounded-[40px] overflow-hidden bg-slate-100 shadow-2xl relative group">
                <img
                    src={images[activeImage]}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 flex gap-3">
                    <Badge variant="success" className="text-xs px-4 py-2 shadow-lg">
                        VÉRIFIÉ
                    </Badge>
                    <Badge variant="primary" className="text-xs px-4 py-2 shadow-lg">
                        DISPONIBLE
                    </Badge>
                </div>
            </div>
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(idx)}
                            className={`aspect-video rounded-2xl overflow-hidden border-4 transition-all duration-300 hover:scale-105 ${activeImage === idx ? "border-brand-primary shadow-xl" : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                        >
                            <img src={img} alt={`${title} ${idx + 1}`} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
