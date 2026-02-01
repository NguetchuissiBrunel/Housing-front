import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import SearchContent from "@/components/search/SearchContent";

export default function SearchPage() {
    return (
        <div className="min-h-screen pt-20 bg-white">
            <Suspense fallback={
                <div className="flex items-center justify-center h-[50vh]">
                    <Loader2 className="w-10 h-10 animate-spin text-brand-primary/50" />
                </div>
            }>
                <SearchContent />
            </Suspense>
        </div>
    );
}
